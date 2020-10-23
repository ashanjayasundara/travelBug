import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: 'AIzaSyA0_ACfYMSkcq2KjUZxT1trS6hWgfwhUxE',
    authDomain: 'mytestapp-a6b8f.firebaseapp.com',
    databaseURL: 'https://mytestapp-a6b8f.firebaseio.com',
    projectId: 'mytestapp-a6b8f',
    storageBucket: 'mytestapp-a6b8f.appspot.com',
    messagingSenderId: '427736063690',
    appId: '1:427736063690:web:0a01466857002b27951e33',
};

if (!firebase.apps.length) {
    console.log(firebase.app.name);
    firebase.initializeApp(config);
    firebase.firestore().settings({experimentalForceLongPolling: true});
}

export default firebase;
