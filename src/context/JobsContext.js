import React, { useReducer, createContext, useContext, useState } from "react";
import { db } from "../firebase/firebase";
import { query, addDoc, getDocs, collection, where, getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "./UserContext";

const JobsContext = createContext();

const jobsReducer = (jobs, action) => {
    switch (action.type) {
        case "ADD_NEW_JOB":
            return [...jobs, action.payload];
        case "FETCH_JOBS":
            return action.payload;
        case "UPDATE_JOB":
            return jobs.map((job) => {
                if (job.jobId === action.payload.jobId) {
                    return { ...job, jobStatus: action.payload.jobStatus };
                } else {
                    return job;
                }
            });
        default:
            return jobs;
    }
};
const candidatesReducer = (candidates, action) => {
    switch (action.type) {
        case "FETCH_CANDIDATES":
            return action.payload;
        case "ADD_NEW_CANDIDATE":
            return (
                candidates.find((candidate) => candidate.jobId === action.payload.jobId)
                    ? candidates
                    : [...candidates, action.payload]
            );
        case "UPDATE_CANDIDATE":
            return candidates.map((candidate) => {
                if (candidate.jobId === action.payload.jobId) {
                    return { ...candidate, ...action.payload };
                }
                return candidate;
            });
        default:
            return candidates;
    }
};

const JobsProvider = ({ children }) => {
    const [jobs, jobsDispatch] = useReducer(jobsReducer, []);
    const [jobForReview, setJobForReview] = useState({});
    const [candidates, candidatesDispatch] = useReducer(candidatesReducer, []);
    const { user } = useContext(UserContext);

    const createJob = async ({ job, setLoading, navigationCallback }) => {
        try {
            const newJob = {
                ...user,
                createdAt: serverTimestamp(),
                jobStatus: "under-review",
                ...job,
            };
            const docRef = await addDoc(collection(db, "jobs"), newJob);
            await setDoc(doc(db, "jobs", docRef.id), { jobId: docRef.id }, { merge: true });
            newJob.jobId = docRef.id;
            jobsDispatch({ type: "ADD_NEW_JOB", payload: newJob });
            navigationCallback(docRef.id);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchJobs = async (selectedCity) => {
        try {
            const updatedJobs = [];
            const q = query(collection(db, "jobs"), where("jobCity", "==", selectedCity), where("jobStatus", "==", "active"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedJobs.push(doc.data());
            });
            jobsDispatch({ type: "FETCH_JOBS", payload: updatedJobs });
        } catch (error) {
            console.log(error);
        }
    };
    const fetchPostedJobs = async (userId) => {
        try {
            const updatedJobs = [];
            const q = query(collection(db, "jobs"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedJobs.push(doc.data());
            });
            jobsDispatch({ type: "FETCH_JOBS", payload: updatedJobs });
        } catch (error) {
            console.log(error);
        }
    };
    const updateJob = async ({ jobId, jobStatus }) => {
        try {
            await setDoc(doc(db, "jobs", jobId), { jobStatus }, { merge: true });
            jobsDispatch({ type: "UPDATE_JOB", payload: { jobId, jobStatus } });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCandidates = async (userId) => {
        try {
            const updatedCandidates = [];
            const q = query(collection(db, "candidates"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedCandidates.push(doc.data());
            });
            candidatesDispatch({ type: "FETCH_CANDIDATES", payload: updatedCandidates });
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCandidatesByJobId = async (jobId) => {
        try {
            const updatedCandidates = [];
            const q = query(collection(db, "candidates"), where("jobId", "==", jobId), where("candidateStatus", "==", "applied"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedCandidates.push(doc.data());
            });
            candidatesDispatch({ type: "FETCH_CANDIDATES", payload: updatedCandidates });
        } catch (error) {
            console.log(error);
        }
    };


    const addNewCandidate = async ({ jobId, candidateStatus, navigationCallback }) => {
        try {
            const newCandidate = {
                ...user,
                jobId: jobId,
                createdAt: serverTimestamp(),
                candidateStatus: candidateStatus,
            };
            const q = query(collection(db, "candidates"), where("jobId", "==", jobId), where("userId", "==", user.userId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                const docRef = await addDoc(collection(db, "candidates"), newCandidate);
                await setDoc(doc(db, "candidates", docRef.id), { candidateId: docRef.id }, { merge: true });
                newCandidate.candidateId = docRef.id;
            }
            candidatesDispatch({ type: "ADD_NEW_CANDIDATE", payload: newCandidate });
            navigationCallback();
        } catch (error) {
            console.log(error);
        }
    };
    const updateCandidate = async ({ jobId, candidateStatus, navigationCallback }) => {
        try {
            const q = query(collection(db, "candidates"), where("jobId", "==", jobId), where("userId", "==", user.userId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                await setDoc(doc(db, "candidates", querySnapshot.docs[0].id), { candidateStatus: candidateStatus, ...user }, { merge: true });
            }
            candidatesDispatch({ type: "UPDATE_CANDIDATE", payload: { jobId: jobId, candidateStatus: candidateStatus, ...user } });
            navigationCallback();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <JobsContext.Provider value={{ jobs, jobForReview, candidates, setJobForReview, createJob, fetchJobs, updateJob, fetchPostedJobs, addNewCandidate, updateCandidate, fetchCandidates, fetchCandidatesByJobId }}>
            {children}
        </JobsContext.Provider>
    );
};

export { JobsContext, JobsProvider };