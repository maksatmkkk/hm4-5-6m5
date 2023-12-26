import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCwzQJ0ugIGf6HpNi7ve3oAlSUXe5DaeYQ",
    authDomain: "test-toolkit-76e96.firebaseapp.com",
    projectId: "test-toolkit-76e96",
    storageBucket: "test-toolkit-76e96.appspot.com",
    messagingSenderId: "237125126370",
    appId: "1:237125126370:web:8824ab53ccdaab556476bb"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app); 

export { app, auth, provider, db };
export default app;
