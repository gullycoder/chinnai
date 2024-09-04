import React, { useReducer, createContext, useContext, useState } from "react";
import { db } from "../firebase/firebase";
import { query, addDoc, getDocs, collection, where, getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "./UserContext";

const TendersContext = createContext();

const tendersReducer = (tenders, action) => {
    switch (action.type) {
        case "ADD_NEW_TENDER":
            return [...tenders, action.payload];
        case "FETCH_TENDERS":
            return action.payload;
        default:
            return tenders;
    }
};
const biddersReducer = (bidders, action) => {
    switch (action.type) {
        case "FETCH_BIDDERS":
            return action.payload;
        case "ADD_NEW_BIDDER":
            return (
                bidders.find((bidder) => bidder.tenderId === action.payload.tenderId)
                    ? bidders
                    : [...bidders, action.payload]
            );
        case "UPDATE_BIDDER":
            return bidders.map((bidder) => {
                if (bidder.tenderId === action.payload.tenderId) {
                    return { ...bidder, ...action.payload };
                }
                return bidder;
            });
        default:
            return bidders;
    }
};

const TendersProvider = ({ children }) => {
    const [tenders, tendersDispatch] = useReducer(tendersReducer, []);
    const [tenderForReview, setTenderForReview] = useState({});
    const [bidders, biddersDispatch] = useReducer(biddersReducer, []);
    const { user } = useContext(UserContext);


    const fetchTenders = async (selectedCity) => {
        try {
            const updatedTenders = [];
            const q = query(collection(db, "tenders"), where("tenderCity", "==", selectedCity));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedTenders.push(doc.data());
            });
            tendersDispatch({ type: "FETCH_TENDERS", payload: updatedTenders });
            // console.log("Tenders Context: ", updatedTenders);
        } catch (error) {
            console.log(error);
        }
    };
    const createTender = async (tender, navigateToCardScreen) => {
        try {
            const newTender = {
                ...user,
                ownerType: "client",
                createdAt: serverTimestamp(),
                ...tender,
            };
            const docRef = await addDoc(collection(db, "tenders"), newTender);
            await setDoc(doc(db, "tenders", docRef.id), { tenderId: docRef.id }, { merge: true });
            newTender.tenderId = docRef.id;
            tendersDispatch({ type: "ADD_NEW_TENDER", payload: newTender });
            navigateToCardScreen();
        } catch (error) {
            console.log(error);
        }
    };


    const fetchBidders = async (userId) => {
        try {
            const updatedBidders = [];
            const q = query(collection(db, "bidders"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedBidders.push(doc.data());
            });
            biddersDispatch({ type: "FETCH_BIDDERS", payload: updatedBidders });
        } catch (error) {
            console.log(error);
        }
    };
    const addNewBidder = async ({ tenderId, bidderStatus, navigationCallback }) => {
        try {
            const newBidder = {
                ...user,
                tenderId: tenderId,
                createdAt: serverTimestamp(),
                bidderStatus: bidderStatus,
            };
            const q = query(collection(db, "bidders"), where("tenderId", "==", tenderId), where("userId", "==", user.userId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                const docRef = await addDoc(collection(db, "bidders"), newBidder);
                await setDoc(doc(db, "bidders", docRef.id), { bidderId: docRef.id }, { merge: true });
                newBidder.bidderId = docRef.id;
            }
            biddersDispatch({ type: "ADD_NEW_BIDDER", payload: newBidder });
            navigationCallback();
        } catch (error) {
            console.log(error);
        }
    };
    const updateBidder = async ({ tenderId, bid, bidderStatus, navigationCallback }) => {
        try {
            const q = query(collection(db, "bidders"), where("tenderId", "==", tenderId), where("userId", "==", user.userId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                await setDoc(doc(db, "bidders", querySnapshot.docs[0].id), { bidderStatus: bidderStatus, bid: bid }, { merge: true });
            }
            biddersDispatch({ type: "UPDATE_BIDDER", payload: { tenderId, bidderStatus, bid } });
            navigationCallback();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TendersContext.Provider value={{ tenders, tender: tenderForReview, bidders, fetchTenders, createTender, setTenderForReview, fetchBidders, addNewBidder, updateBidder }}>
            {children}
        </TendersContext.Provider>
    );
};

export { TendersContext, TendersProvider };