import Geolocation from '@react-native-community/geolocation';
import firebase from '../Firebase';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

const trackerOption = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10};
export default class DataStore {
    user = null;
    gpsTimer = null;
    locationsDB = null;
    tasksRef = null;
    gpsInformation = [];
    gpsSubscribers = new Map();
    networkInformationListener = null;
    isConnected = false;
    lastCord = null;
    lastSnap = null;

    constructor(props) {
        NetInfo.fetch().then((connectionInfo) => {
            this.isConnected = connectionInfo.isConnected;
        });
        this.networkInformationListener = NetInfo.addEventListener(state => {
            this.handleConnectionChange(state);
            this.isConnected = state.isConnected;
        });

    }

    async handleConnectionChange(state) {
        if (!this.isConnected && state.isConnected) {
            await AsyncStorage.getItem('userlocate').then((cord) => {
                if (cord != null) {
                    this.lastCord = JSON.parse(cord);
                }
            }).catch((error) => {
            });
            await AsyncStorage.getItem('SNAP_BUILDER').then(val => {
                if (val != null) {
                    this.lastSnap = parseInt(val);
                }
            }).catch(error => {
            });

            if (this.lastCord != null && this.lastCord.snapID != this.lastSnap) {
                this.publishToFirestore(this.lastCord);
            }
        }
    }

    getGPSInformation() {
        return this.gpsInformation;
    }

    subscribeToGPSListener(key, componet) {
        this.gpsSubscribers.set(key, componet);
    }

    unSubscribeFromGPSListener(key) {
        return this.gpsSubscribers.delete(key);
    }

    publishCoordinates() {
        this.gpsSubscribers.forEach(value => value.onRecordUpdate(this.gpsInformation));
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
                console.log('initial position ', initialPosition);
            },
            error => console.error('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 50},
        );
        this.gpsTimer = Geolocation.watchPosition(position => {
                this.persistData(position);
                console.log('location updates ', JSON.stringify(position));
            }, error => console.log('Tracking failed ', error),
            trackerOption);
    }

    onClose() {
        if (this.gpsTimer != null) {
            Geolocation.clearWatch(this.gpsTimer);
        }
        if (this.networkInformationListener != null) {
            this.networkInformationListener();
        }
    }

    async persistData(data) {
        let cord = {
            uid: this.user.uid, latitude: [data.coords.latitude],
            longitude: [data.coords.longitude], timestamp: [data.timestamp], snapID: data.timestamp,
        };
        let localCord = {
            uuid: data.coords.latitude + data.coords.latitude,
            longitude: data.coords.longitude,
            latitude: data.coords.latitude,
            timestamp: data.timestamp,
        };
        this.gpsInformation.push(localCord);
        this.publishCoordinates();
        await AsyncStorage.setItem('userlocate', cord, error => {
            if (error?.message) {
                console.log('an error occurred while updating database record : ' + error.message);
            } else {
                this.publishToFirestore(cord);
            }
        });
    }

    publishToFirestore(cord) {
        firebase.firestore().collection('userlocate').doc(cord.uid).set(cord, {merge: true}).then(async (docRef) => {
            await AsyncStorage.setItem('SNAP_BUILDER', cord.snapID);
            console.debug('new tracking record is added');
        }).catch((error) => {
            console.error('Error adding document: ', error);
        });
    }

}
