import { useReducer, useEffect, useState } from "react";
import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { projectFirestore, Timestamp } from "../firebase-config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = "";

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (collection, id, document) => {
    const ref = doc(projectFirestore, collection, id);
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = new Date().toISOString();
      const addedDocument = await setDoc(
        ref,
        { ...document, createdAt },
        {
          merge: true,
        }
      );
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  // update a document array field
  const updateDocArray = async (document) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = new Date().toISOString();
      const addedDocument = await setDoc(
        ref,
        { activities: arrayUnion({ ...document, createdAt }) },
        {
          merge: true,
        }
      );
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };

  // delete a document
  const deleteDocument = async (collection, id) => {
    dispatch({ type: "DELETED_DOCUMENT" });
    const ref = doc(projectFirestore, collection, id);

    try {
      const deletedDocument = await deleteDoc(ref);
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, updateDocArray, deleteDocument, response };
};
