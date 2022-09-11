import React, { useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { projectFirestore } from "../../firebase-config";

//const querySnapshot = await getDocs(collection(projectFirestore, "users"))  ---- DB
const FirebaseQueries = () => {
  //retrieve "Zed" user
  useEffect(() => {
    async function getSingleUser() {
      const docRef = doc(projectFirestore, "users/Zed");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  }, []);

  // get all docs
  useEffect(() => {
    //"Warning: useEffect must not return anything besides a function, which is used for clean-up." It looks like you wrote useEffect(async () => ...) or returned a Promise. //Instead, write the async function inside your effect and call it immediately
    async function getAllUsers() {
      const querySnapshot = await getDocs(
        collection(projectFirestore, "users")
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }
    getAllUsers();
  }, []);

  return <></>;
};

export { FirebaseQueries };
