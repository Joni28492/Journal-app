import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCj4DAJuptXNaIgQmQBxvYsSSrWo_mz2Mw",
    authDomain: "react-app-cursos-db9ff.firebaseapp.com",
    projectId: "react-app-cursos-db9ff",
    storageBucket: "react-app-cursos-db9ff.appspot.com",
    messagingSenderId: "657813584416",
    appId: "1:657813584416:web:bd07eba84a7a6f082bda45"
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export { db, googleAuthProvider, firebase}