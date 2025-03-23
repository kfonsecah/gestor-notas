import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5Nhycl2PhBkkqL9lFi9_eP1LRIYKIv3Y",
    authDomain: "notes-32115.firebaseapp.com",
    projectId: "notes-32115",
    storageBucket: "notes-32115.firebasestorage.app",
    messagingSenderId: "666515946278",
    appId: "1:666515946278:web:b27490693ba29360ed5fe7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
