import Geolocation from '@react-native-community/geolocation';
import firebase from '../Firebase';
import AsyncStorage from '@react-native-community/async-storage';

const trackerOption = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10};
export default class DataStore {
    user = null;
    gpsTimer = null;
    locationsDB = null;
    tasksRef = null;

    constructor(props) {
        // this.tasksRef = firebase.database().ref('/user-locates');
    }


    getUser() {
        return this.user;
    }

    setUser(user) {
        this.user = user;
        if (this.gpsTimer == null) {
            this.startTracker();
        }
    }

    startTracker() {
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                this.persistData(position);
                alert(initialPosition);
            },
            error => alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
        );
        this.gpsTimer = Geolocation.watchPosition(position => {
                this.persistData(position);
                alert(JSON.stringify(position));
            }, error => console.log('Tracking failed ', error),
            trackerOption);
    }

    onClose() {
        if (this.gpsTimer != null) {
            Geolocation.clearWatch(this.gpsTimer);
        }
    }

    async persistData(data) {
        let cord = {
            uid: this.user.uid, latitude: [data.coords.latitude],
            longitude: [data.coords.longitude], timestamp: [data.timestamp],
        };
        await AsyncStorage.setItem('userlocate', cord, error => {
            if (error?.message) {
                console.log('an error occurred while updating database record : ' + error.message);
            } else {
                firebase.firestore().collection('userlocate').doc(cord.uid).set(cord, {merge: true}).then((docRef) => {
                    console.log('new tracking record is added');
                }).catch((error) => {
                    console.error('Error adding document: ', error);
                    alert('DB View ' + error);
                });
            }
        });


        // let newPostKey = firebase
        //     .database()
        //     .ref()
        //     .child('user-locates')
        //     .push().key;
        //
        //
        // let updates = {};
        // updates['/user-locates/' + newPostKey] = cord;
        //
        // firebase
        //     .database()
        //     .ref()
        //     .update(updates);
    }
}
