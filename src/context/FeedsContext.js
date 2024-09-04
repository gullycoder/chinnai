import React, { useReducer, createContext, useState, useContext } from "react";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { query, startAfter, orderBy, limit, addDoc, getDocs, collection, where, getDoc, doc, setDoc, serverTimestamp, arrayUnion, updateDoc, deleteDoc, increment } from "firebase/firestore";
import { UserContext } from "./UserContext";

const FeedsContext = createContext();

const reducer = (feeds, action) => {
    switch (action.type) {
        case "ADD_NEW_FEED":
            return [...feeds, action.payload];
        case "FETCH_FEEDS":
            return action.payload;
        case "UPDATE_DELETED_FEED":
            return action.payload;
        default:
            return feeds;
    }
};

const feedRepliesReducer = (feedReplies, action) => {
    switch (action.type) {
        case "ADD_NEW_FEED_REPLY":
            return [...feedReplies, action.payload];
        case "GET_FEED_REPLIES":
            return action.payload;
        case "UPDATE_FEED_REPLIES":
            return action.payload;
        default:
            return feedReplies;
    }
};
const feedClapsReducer = (feedClaps, action) => {
    switch (action.type) {
        case "ADD_NEW_FEEDCLAP":
            return [...feedClaps, action.payload];
        case "UPDATE_FEEDCLAP":
            return feedClaps.map(feedClap => {
                if (feedClap.feedClapId === action.payload.feedClapId) {
                    return { ...feedClap, feedClapsCount: feedClap.feedClapsCount + 1 };
                } else {
                    return feedClap;
                }
            });
        case "GET_CLAPS":
            return action.payload;
        case "UPDATE_DELETED_CLAPS":
            return action.payload;
        default:
            return feedClaps;
    }
};

const feedReplyClapsReducer = (feedReplyClaps, action) => {
    switch (action.type) {
        case "ADD_NEW_FEEDREPLYCLAP":
            return [...feedReplyClaps, action.payload];
        case "UPDATE_FEEDREPLYCLAP":
            return feedReplyClaps.map(feedReplyClap => {
                if (feedReplyClap.feedReplyClapId === action.payload.feedReplyClapId) {
                    return { ...feedReplyClap, feedReplyClapsCount: feedReplyClap.feedReplyClapsCount + 1 };
                } else {
                    return feedReplyClap;
                }
            });

        case "GET_FEED_REPLY_CLAPS":
            return action.payload;
        case "UPDATE_FEED_REPLY_CLAPS":
            return action.payload;
        default:
            return feedReplyClaps;
    }
};


const FeedsProvider = ({ children }) => {
    const [feeds, dispatch] = useReducer(reducer, []);
    const [feedReplies, feedRepliesDispatch] = useReducer(feedRepliesReducer, []);
    const [feedClaps, feedClapsDispatch] = useReducer(feedClapsReducer, []);
    const [feedReplyClaps, feedReplyClapsDispatch] = useReducer(feedReplyClapsReducer, []);
    const { user, updateUserField, uploadFileToStorage } = useContext(UserContext);


    const createFeedReply = async ({ feedId, feedReplyContent }) => {
        try {
            let feedReply = {
                ...user,
                feedId: feedId,
                feedReplyContent: feedReplyContent,
                createdAt: serverTimestamp(),
            }
            feedReplyRef = await addDoc(collection(db, "feedReplies"), feedReply)
            await setDoc(doc(db, "feedReplies", feedReplyRef.id), { feedReplyId: feedReplyRef.id }, { merge: true })
            const newFeedWithTimeStampDocRef = await getDoc(doc(db, 'feedReplies', feedReplyRef.id))
            feedReply = newFeedWithTimeStampDocRef.data();
            feedRepliesDispatch({ type: "ADD_NEW_FEED_REPLY", payload: feedReply })
            // console.log("feedReply@feedcontext", feedReply);
        }
        catch (error) {
            console.log("Error in FeedsContext, createFeedReply", error);
        }
    }

    const createFeed = async ({ feed, navigationCallback, setLoading }) => {
        try {
            let newFeed = {
                ...user,
                createdAt: serverTimestamp(),
                ...feed,
            }
            const docRef = await addDoc(collection(db, "feeds"), newFeed);
            if (feed.feedPhotoUrl) {
                const url = await uploadFileToStorage(feed.feedPhotoUrl, docRef.id);
                await setDoc(doc(db, 'feeds', docRef.id), { feedPhotoUrl: url, feedId: docRef.id }, { merge: true });
            } else {
                await setDoc(doc(db, 'feeds', docRef.id), { feedId: docRef.id }, { merge: true });
            }
            const newFeedWithTimeStampDocRef = await getDoc(doc(db, 'feeds', docRef.id))
            newFeed = newFeedWithTimeStampDocRef.data();
            dispatch({ type: "ADD_NEW_FEED", payload: newFeed });
            navigationCallback(docRef.id);
            setLoading(false);
        }
        catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // get collections
    const fetchFeed = async () => {
        let updatedFeed = [];
        try {
            const q = query(collection(db, "feeds"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedFeed.push(doc.data());
            });
            dispatch({ type: "FETCH_FEEDS", payload: updatedFeed });
        }
        catch (error) {
        }
    };

    // get feed reply
    const getFeedReply = async () => {
        let updatedFeedReply = [];
        try {
            const q = query(collection(db, "feedReplies"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedFeedReply.push(doc.data());
            });
            feedRepliesDispatch({ type: "GET_FEED_REPLIES", payload: updatedFeedReply });
        }
        catch (error) {
            console.log(error);
        };
    };
    // Fetch claps
    const fetchClaps = async () => {
        let updatedClaps = [];
        try {
            const q = query(collection(db, "feedClaps"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedClaps.push(doc.data());
            });
            feedClapsDispatch({ type: "GET_CLAPS", payload: updatedClaps });
        }
        catch (error) {
            console.log(error);
        };
    };
    // Fetch feed reply claps
    const fetchFeedReplyClaps = async () => {
        let updatedFeedReplyClaps = [];
        try {
            const q = query(collection(db, "feedReplyClaps"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updatedFeedReplyClaps.push(doc.data());
            });
            feedReplyClapsDispatch({ type: "GET_FEED_REPLY_CLAPS", payload: updatedFeedReplyClaps });
        }
        catch (error) {
            console.log(error);
        };
    };
    // Delet Reply
    const deletFeedsReply = async (item) => {
        const feedReplyId = item.feedReplyId
        const feedId = item.feedId

        if (feedReplyId) {
            try {
                const deletClapsOfFeedReply = feedReplyClaps.filter(clap => clap.feedReplyId === feedReplyId);
                // console.log("deletClapsOfFeedReply", deletClapsOfFeedReply);
                deletClapsOfFeedReply.forEach(async (clap) => {
                    await deleteDoc(doc(db, "feedReplyClaps", clap.feedReplyClapId));
                });
                let x = new Set(deletClapsOfFeedReply);
                let updatedFeedReplyClaps = [...feedReplyClaps].filter(clap => !x.has(clap));
                feedReplyClapsDispatch({ type: "UPDATE_FEED_REPLY_CLAPS", payload: updatedFeedReplyClaps });
                await deleteDoc(doc(db, "feedReplies", feedReplyId));
                const updatedFeedReply = [...feedReplies].filter(reply => reply.feedReplyId !== feedReplyId);
                feedRepliesDispatch({ type: "UPDATE_FEED_REPLIES", payload: updatedFeedReply });
            }
            catch (error) {
                console.log("Error in FeedsContext Screen @ deletfeedReplies", error);
            };
        } else {
            try {
                //delete claps of feed replies
                const deletClapsOfFeedReply = feedReplyClaps.filter(clap => clap.feedId === feedId);
                deletClapsOfFeedReply.forEach(async (clap) => {
                    await deleteDoc(doc(db, "feedReplyClaps", clap.feedReplyClapId));
                }
                );
                let x = new Set(deletClapsOfFeedReply);
                let updatedFeedReplyClaps = [...feedReplyClaps].filter(clap => !x.has(clap));
                feedReplyClapsDispatch({ type: "UPDATE_FEED_REPLY_CLAPS", payload: updatedFeedReplyClaps });
                // deleting feed claps
                const deletClapsOfFeed = feedClaps ? feedClaps.filter(clap => clap.feedId === feedId) : [];
                deletClapsOfFeed.forEach(async (clap) => {
                    await deleteDoc(doc(db, "feedClaps", clap.feedClapId));
                });
                let y = new Set(deletClapsOfFeed);
                let updatedClaps = [...feedClaps].filter(clap => !y.has(clap));
                feedClapsDispatch({ type: "UPDATE_DELETED_CLAPS", payload: updatedClaps });
                // deleting feed reply
                const deletfeedReplies = feedReplies.filter(reply => reply.feedId === feedId);
                deletfeedReplies.forEach(async (reply) => {
                    await deleteDoc(doc(db, "feedReplies", reply.feedReplyId));
                }
                );
                let x1 = new Set(deletfeedReplies);
                let updatedFeedReply = [...feedReplies].filter(reply => !x1.has(reply));
                feedRepliesDispatch({ type: "UPDATE_FEED_REPLIES", payload: updatedFeedReply });
                await deleteDoc(doc(db, "feeds", feedId));
                const updatedFeed = [...feeds].filter(feed => feed.feedId !== feedId);
                dispatch({ type: "UPDATE_DELETED_FEED", payload: updatedFeed });
            }
            catch (error) {
                console.log("Error in FeedsContext Screen @ deletfeedReplies", error);
            };
        }
    };


    const createOrUpdateFeedClap = async ({ feedId, feedClapId }) => {
        try {
            if (!feedClapId) {
                let newClap = {
                    ...user,
                    feedId: feedId,
                    feedClapsCount: 1,
                    createdAt: serverTimestamp(),
                }
                const docRef = await addDoc(collection(db, "feedClaps"), newClap);
                await setDoc(doc(db, 'feedClaps', docRef.id), { feedClapId: docRef.id }, { merge: true });
                newClap.feedClapId = docRef.id;
                feedClapsDispatch({ type: "ADD_NEW_FEEDCLAP", payload: newClap });
            } else {
                const docRef = doc(db, "feedClaps", feedClapId);
                await updateDoc(docRef, {
                    feedClapsCount: increment(1),
                });
                feedClapsDispatch({ type: "UPDATE_FEEDCLAP", payload: { feedClapId } });
            }
        }
        catch (error) {
            console.log(error);
        };
    };

    const createOrUpdateFeedReplyClap = async ({ feedReplyId, feedReplyClapId }) => {
        try {
            if (!feedReplyClapId) {
                let newClap = {
                    ...user,
                    feedReplyId: feedReplyId,
                    feedReplyClapsCount: 1,
                    createdAt: serverTimestamp(),
                }
                const docRef = await addDoc(collection(db, "feedReplyClaps"), newClap);
                await setDoc(doc(db, 'feedReplyClaps', docRef.id), { feedReplyClapId: docRef.id }, { merge: true });
                newClap.feedReplyClapId = docRef.id;
                feedReplyClapsDispatch({ type: "ADD_NEW_FEEDREPLYCLAP", payload: newClap });
            } else {
                const docRef = doc(db, "feedReplyClaps", feedReplyClapId);
                await updateDoc(docRef, {
                    feedReplyClapsCount: increment(1),
                });
                feedReplyClapsDispatch({ type: "UPDATE_FEEDREPLYCLAP", payload: { feedReplyClapId } });
            }
        }
        catch (error) {
            console.log(error);
        };
    };


    return (
        <FeedsContext.Provider value={{ feeds, createFeedReply, feedReplies, createFeed, fetchFeed, getFeedReply, createOrUpdateFeedClap, fetchClaps, createOrUpdateFeedReplyClap, deletFeedsReply, feedReplyClaps, fetchFeedReplyClaps, feedClaps }}>
            {children}
        </FeedsContext.Provider>
    );
};

export { FeedsContext, FeedsProvider };
