import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "shellhacks-22.firebaseapp.com",
  projectId: "shellhacks-22",
  storageBucket: "shellhacks-22.appspot.com",
  messagingSenderId: "24737044178",
  appId: "1:24737044178:web:58c5e184af38b389b27f0b",
};

// init firebase
const db = initializeApp(firebaseConfig);

// init services
const projectFirestore = getFirestore(db);
const projectAuth = getAuth(db);
const storage = getStorage();

export { projectFirestore, projectAuth, storage };
