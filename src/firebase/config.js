import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqWyl_suiG-D8_zJOyddBnBK6qAvKC6d0",
    authDomain: "travelbug-2aeb1.firebaseapp.com",
    databaseURL: "https://travelbug-2aeb1.firebaseio.com",
    projectId: "travelbug-2aeb1",
    storageBucket: "travelbug-2aeb1.appspot.com",
    messagingSenderId: "641315289169",
    appId: "1:641315289169:web:a04bedb587858aaff9a070",
    measurementId: "G-ELVRCPWN65"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
