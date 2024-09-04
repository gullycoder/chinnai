import React, { useReducer, createContext, useEffect } from "react";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { query, addDoc, getDocs, collection, where, getDoc, doc, setDoc, updateDoc, writeBatch, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";

const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        case "UPDATE_USER_DOCUMENTS":
            return { ...state, userDocuments: [...new Set([...state.userDocuments, ...action.payload])] };
        default:
            return state;
    }
};

const rulesReducer = (state, action) => {
    switch (action.type) {
        case "GET_RULES":
            return action.payload;
        default:
            return state;
    }
};
const userForPublicProfileReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_USER_FOR_PUBLIC_PROFILE":
            return action.payload;
        default:
            return state;
    }
};

const UserProvider = ({ children }) => {
    const [user, userDispatch] = useReducer(userReducer, {});
    const [rules, rulesDispatch] = useReducer(rulesReducer, {});
    const [userForPublicProfile, setUserForPublicProfile] = useReducer(userForPublicProfileReducer, {});

    useEffect(async () => {
        const docRef = doc(db, "rules", "userRules");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            rulesDispatch({ type: "GET_RULES", payload: docSnap.data() });
        } else {
            console.log("No rules found");
        }
    }, []);


    const updateUserField = async (key, value) => {
        try {
            const batch = writeBatch(db);
            const usersDocRef = doc(db, "users", user.userId);
            batch.update(usersDocRef, { [key]: value });

            if (user.userType === "worker") {
                const candidatesQuery = query(collection(db, "candidates"), where("userId", "==", user.userId));
                const candidatesSnap = await getDocs(candidatesQuery);
                candidatesSnap.forEach((candidate) => {
                    batch.update(doc(db, "candidates", candidate.id), { [key]: value });
                });
            } else if (user.userType === "contractor") {
                const postedJobsQuery = query(collection(db, "jobs"), where("userId", "==", user.userId));
                const postedJobsSnap = await getDocs(postedJobsQuery);
                postedJobsSnap.forEach((job) => {
                    batch.update(doc(db, "jobs", job.id), { [key]: value });
                });
                const biddersQuery = query(collection(db, "bidders"), where("userId", "==", user.userId));
                const biddersSnap = await getDocs(biddersQuery);
                biddersSnap.forEach((bidder) => {
                    batch.update(doc(db, "bidders", bidder.id), { [key]: value });
                });
            }

            const feedsQuery = query(collection(db, "feeds"), where("userId", "==", user.userId));
            const feedsSnap = await getDocs(feedsQuery);
            feedsSnap.forEach((feed) => {
                batch.update(doc(db, "feeds", feed.id), { [key]: value });
            });
            const feedRepliesQuery = query(collection(db, "feedReplies"), where("userId", "==", user.userId));
            const feedRepliesSnap = await getDocs(feedRepliesQuery);
            feedRepliesSnap.forEach((feedReply) => {
                batch.update(doc(db, "feedReplies", feedReply.id), { [key]: value });
            });

            await batch.commit();
            userDispatch({ type: "SET_USER", payload: { ...user, [key]: value, } });
        } catch (error) {
            console.log(error);
        }
    };



    const updateTwoUserFields = async (key1, value1, key2, value2) => {
        try {
            const batch = writeBatch(db);
            const usersDocRef = doc(db, "users", user.userId);
            batch.update(usersDocRef, { [key1]: value1, [key2]: value2 });

            if (user.userType === "worker") {
                const candidatesQuery = query(collection(db, "candidates"), where("userId", "==", user.userId));
                const candidatesSnap = await getDocs(candidatesQuery);
                candidatesSnap.forEach((candidate) => {
                    batch.update(doc(db, "candidates", candidate.id), { [key1]: value1, [key2]: value2 });
                });
            } else if (user.userType === "contractor") {
                const postedJobsQuery = query(collection(db, "jobs"), where("userId", "==", user.userId));
                const postedJobsSnap = await getDocs(postedJobsQuery);
                postedJobsSnap.forEach((job) => {
                    batch.update(doc(db, "jobs", job.id), { [key1]: value1, [key2]: value2 });
                });
                const biddersQuery = query(collection(db, "bidders"), where("userId", "==", user.userId));
                const biddersSnap = await getDocs(biddersQuery);
                biddersSnap.forEach((bidder) => {
                    batch.update(doc(db, "bidders", bidder.id), { [key1]: value1, [key2]: value2 });
                });
            }

            const feedsQuery = query(collection(db, "feeds"), where("userId", "==", user.userId));
            const feedsSnap = await getDocs(feedsQuery);
            feedsSnap.forEach((feed) => {
                batch.update(doc(db, "feeds", feed.id), { [key1]: value1, [key2]: value2 });
            });
            const feedRepliesQuery = query(collection(db, "feedReplies"), where("userId", "==", user.userId));
            const feedRepliesSnap = await getDocs(feedRepliesQuery);
            feedRepliesSnap.forEach((feedReply) => {
                batch.update(doc(db, "feedReplies", feedReply.id), { [key1]: value1, [key2]: value2 });
            });

            await batch.commit();
            userDispatch({ type: "SET_USER", payload: { ...user, [key1]: value1, [key2]: value2, } });
        } catch (error) {
            console.log(error);
        }
    };



    const uploadFileToStorage = async (localFileUrl, storageDocId) => {
        try {
            const imagesRef = ref(storage, storageDocId);
            const img = await fetch(localFileUrl)
            const bytes = await img.blob()
            await uploadBytes(imagesRef, bytes);
            const url = await getDownloadURL(imagesRef);
            return url;
        }
        catch (error) {
            console.log("The Error part Run", error);
        }
    };

    const fetchUserForPublicProfile = async (userId) => {
        try {
            const usersDocRef = doc(db, "users", userId);
            const usersSnap = await getDoc(usersDocRef);
            if (usersSnap.exists) {
                setUserForPublicProfile({ type: "FETCH_USER_FOR_PUBLIC_PROFILE", payload: usersSnap.data() });
            } else {
                console.log("No user found");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const updateUserDocuments = async (jobDocuments) => {
        try {
            const batch = writeBatch(db);
            const usersDocRef = doc(db, "users", user.userId);
            batch.update(usersDocRef, { userDocuments: [...new Set([...user.userDocuments, ...jobDocuments])] });

            if (user.userType === "worker") {
                const candidatesQuery = query(collection(db, "candidates"), where("userId", "==", user.userId));
                const candidatesSnap = await getDocs(candidatesQuery);
                candidatesSnap.forEach((candidate) => {
                    batch.update(doc(db, "candidates", candidate.id), { userDocuments: [...new Set([...user.userDocuments, ...jobDocuments])] });
                });
            } else if (user.userType === "contractor") {
                const postedJobsQuery = query(collection(db, "jobs"), where("userId", "==", user.userId));
                const postedJobsSnap = await getDocs(postedJobsQuery);
                postedJobsSnap.forEach((job) => {
                    batch.update(doc(db, "jobs", job.id), { userDocuments: [...new Set([...user.userDocuments, ...jobDocuments])] });
                });
                const biddersQuery = query(collection(db, "bidders"), where("userId", "==", user.userId));
                const biddersSnap = await getDocs(biddersQuery);
                biddersSnap.forEach((bidder) => {
                    batch.update(doc(db, "bidders", bidder.id), { userDocuments: [...new Set([...user.userDocuments, ...jobDocuments])] });
                });
            }

            const feedsQuery = query(collection(db, "feeds"), where("userId", "==", user.userId));
            const feedsSnap = await getDocs(feedsQuery);
            feedsSnap.forEach((feed) => {
                batch.update(doc(db, "feeds", feed.id), { userDocuments: [...new Set([...user.userDocuments, ...jobDocuments])] });
            });
            const feedRepliesQuery = query(collection(db, "feedReplies"), where("userId", "==", user.userId));
            const feedRepliesSnap = await getDocs(feedRepliesQuery);
            feedRepliesSnap.forEach((feedReply) => {
                batch.update(doc(db, "feedReplies", feedReply.id), { userDocuments: [...new Set([...user.userDocuments, ...jobDocuments])] });
            });

            await batch.commit();
            userDispatch({ type: "UPDATE_USER_DOCUMENTS", payload: jobDocuments });
        } catch (error) {
            console.log(error);
        }
    };

    const updateCityAndJobTypes = async (userCity, jobTypesArray, navigateToSearchJobsScreen) => {
        try {
            const batch = writeBatch(db);
            const usersDocRef = doc(db, "users", user.userId);
            batch.update(usersDocRef, { userCity, userJobTypes: jobTypesArray });

            if (user.userType === "worker") {
                const candidatesQuery = query(collection(db, "candidates"), where("userId", "==", user.userId));
                const candidatesSnap = await getDocs(candidatesQuery);
                candidatesSnap.forEach((candidate) => {
                    batch.update(doc(db, "candidates", candidate.id), { userCity, userJobTypes: jobTypesArray });
                });
            } else if (user.userType === "contractor") {
                const postedJobsQuery = query(collection(db, "jobs"), where("userId", "==", user.userId));
                const postedJobsSnap = await getDocs(postedJobsQuery);
                postedJobsSnap.forEach((job) => {
                    batch.update(doc(db, "jobs", job.id), { userCity, userJobTypes: jobTypesArray });
                });
                const biddersQuery = query(collection(db, "bidders"), where("userId", "==", user.userId));
                const biddersSnap = await getDocs(biddersQuery);
                biddersSnap.forEach((bidder) => {
                    batch.update(doc(db, "bidders", bidder.id), { userCity, userJobTypes: jobTypesArray });
                });
            }

            const feedsQuery = query(collection(db, "feeds"), where("userId", "==", user.userId));
            const feedsSnap = await getDocs(feedsQuery);
            feedsSnap.forEach((feed) => {
                batch.update(doc(db, "feeds", feed.id), { userCity, userJobTypes: jobTypesArray });
            });
            const feedRepliesQuery = query(collection(db, "feedReplies"), where("userId", "==", user.userId));
            const feedRepliesSnap = await getDocs(feedRepliesQuery);
            feedRepliesSnap.forEach((feedReply) => {
                batch.update(doc(db, "feedReplies", feedReply.id), { userCity, userJobTypes: jobTypesArray });
            });

            await batch.commit();
            userDispatch({ type: "SET_USER", payload: { ...user, userCity: userCity, userJobTypes: jobTypesArray, } });
            navigateToSearchJobsScreen();
        } catch (error) {
            console.log(error);
        }
    };

    const updateCityAndTenderTypes = async (userCity, tenderTypesArray, navigateToTendersScreen) => {
        try {
            const batch = writeBatch(db);
            const usersDocRef = doc(db, "users", user.userId);
            batch.update(usersDocRef, { userCity, userPreferredTenderTypes: tenderTypesArray });

            if (user.userType === "contractor") {
                const biddersQuery = query(collection(db, "bidders"), where("userId", "==", user.userId));
                const biddersSnap = await getDocs(biddersQuery);
                biddersSnap.forEach((bidder) => {
                    batch.update(doc(db, "bidders", bidder.id), { userCity, userPreferredTenderTypes: tenderTypesArray });
                });
            }

            const feedsQuery = query(collection(db, "feeds"), where("userId", "==", user.userId));
            const feedsSnap = await getDocs(feedsQuery);
            feedsSnap.forEach((feed) => {
                batch.update(doc(db, "feeds", feed.id), { userCity, userPreferredTenderTypes: tenderTypesArray });
            });
            const feedRepliesQuery = query(collection(db, "feedReplies"), where("userId", "==", user.userId));
            const feedRepliesSnap = await getDocs(feedRepliesQuery);
            feedRepliesSnap.forEach((feedReply) => {
                batch.update(doc(db, "feedReplies", feedReply.id), { userCity, userPreferredTenderTypes: tenderTypesArray });
            });

            await batch.commit();
            userDispatch({ type: "SET_USER", payload: { ...user, userCity: userCity, userPreferredTenderTypes: tenderTypesArray, } });
            navigateToTendersScreen();
        } catch (error) {
            console.log(error);
        }
    };

    const updateUserType = async (userType, navigateToBeginCardScreen) => {
        try {
            const docRef = doc(db, "users", user.userId);
            await setDoc(docRef, { userType: userType }, { merge: true });
            userDispatch({ type: "SET_USER", payload: { ...user, userType: userType } });
            navigateToBeginCardScreen();
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    const updateBeginCard = async (navigateToCreateEditCardScreen) => {
        try {
            const docRef = doc(db, "users", user.userId);
            await setDoc(docRef, { userBeginCard: true }, { merge: true });
            userDispatch({ type: "SET_USER", payload: { ...user, userBeginCard: true } });
            navigateToCreateEditCardScreen();
        }
        catch (error) {
            console.log(error);
        }
    };

    const updateFlowComplete = async (navigateToGroupsStack) => {
        try {
            const docRef = doc(db, "users", user.userId);
            await setDoc(docRef, { userFlowComplete: true }, { merge: true });
            userDispatch({ type: "SET_USER", payload: { ...user, userFlowComplete: true } });
            navigateToGroupsStack();
        }
        catch (error) {
            console.log("Error: ", error);
        }
    };
    const updateCardComplete = async (navigateToGroupsStack) => {
        try {
            const docRef = doc(db, "users", user.userId);
            await setDoc(docRef, { userFlowComplete: true, userCardComplete: true }, { merge: true });
            userDispatch({ type: "SET_USER", payload: { ...user, userFlowComplete: true, userCardComplete: true } });
            navigateToGroupsStack();
        }
        catch (error) {
            console.log("Error: ", error);
        }
    };

    const dbUpdateAndNavigate = async (authOrStorageUser, navigateToWorkerTab, navigateToContractorTab, navigateToCreateEditCardScreen, navigateToBeginCardScreen, navigateToSelectUserTypeScreen) => {
        let localUser = {};
        try {
            const q1 = query(collection(db, "users"), where("userId", "==", authOrStorageUser.uid));
            const querySnap = await getDocs(q1);
            querySnap.forEach((doc) => {
                localUser = { ...doc.data() };
            });



            if (localUser.userFlowComplete === true) {
                userDispatch({ type: "SET_USER", payload: localUser });
                if (localUser.userType === "worker") {
                    navigateToWorkerTab();
                }
                else if (localUser.userType === "contractor") {
                    navigateToContractorTab();
                }
                return;
            }
            if (localUser.userBeginCard === true) {
                userDispatch({ type: "SET_USER", payload: localUser });
                navigateToCreateEditCardScreen();
                return;
            }

            if (localUser.userType !== undefined) {
                userDispatch({ type: "SET_USER", payload: localUser });
                navigateToBeginCardScreen();
                return;
            }
            if (localUser.phone !== undefined) {
                userDispatch({ type: "SET_USER", payload: localUser });
                navigateToSelectUserTypeScreen();
                return;
            }

            await setDoc(doc(db, "users", authOrStorageUser.uid), {
                userId: authOrStorageUser.uid,
                phone: authOrStorageUser.phoneNumber,
                createdAt: serverTimestamp(),
            });
            userDispatch({ type: "SET_USER", payload: { userId: authOrStorageUser.uid, phone: authOrStorageUser.phoneNumber } });
            console.log("Document written: ", authOrStorageUser);
            navigateToSelectUserTypeScreen();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserContext.Provider value={{ user, rules, userForPublicProfile, uploadFileToStorage, fetchUserForPublicProfile, dbUpdateAndNavigate, updateUserType, updateBeginCard, updateFlowComplete, updateCardComplete, updateUserField, updateTwoUserFields, updateCityAndJobTypes, updateCityAndTenderTypes, updateUserDocuments }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };