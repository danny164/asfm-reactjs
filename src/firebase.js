import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: 'AIzaSyCTXSMs7l0Q9in_DRFWzrqaAHpHMuGcgAU',
    authDomain: 'capstone2-b9703.firebaseapp.com',
    databaseURL: 'https://capstone2-b9703-default-rtdb.firebaseio.com',
    projectId: 'capstone2-b9703',
    storageBucket: 'capstone2-b9703.appspot.com',
    messagingSenderId: '852859354384',
    appId: '1:852859354384:web:eed810df8feb8048b37995',
    measurementId: 'G-YFCTQQNBF3',
});

export const auth = app.auth();
export const db = app.firestore();
export const realtime = app.database();
export const storage = app.storage();
export default app;
