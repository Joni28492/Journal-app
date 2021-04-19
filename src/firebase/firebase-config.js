import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// console.log(process.env);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:process.env.REACT_APP_APIKEY, 
    authDomain:process.env.REACT_APP_AUTHDOMAIN, 
    projectId:process.env.REACT_APP_PROJECTID, 
    storageBucket:process.env.REACT_APP_STORAGEBUCKET, 
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID, 
    appId:process.env.REACT_APP_APPID, 
};

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyDVQarbHh9vXtPNuz2boI8FNK9AjVNrKn0",
//     authDomain: "testing-journalapp.firebaseapp.com",
//     projectId: "testing-journalapp",
//     storageBucket: "testing-journalapp.appspot.com",
//     messagingSenderId: "206033707964",
//     appId: "1:206033707964:web:b0f474f910965a518b01b9"
// };


// if (process.env.NODE_ENV === 'test') {
//     //testin
//process.env     firebase.initializeApp(firebaseConfigTesting);
// }else{
//     //dev/prod
//     firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export { db, googleAuthProvider, firebase}