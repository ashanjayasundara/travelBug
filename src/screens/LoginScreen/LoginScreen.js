import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from '../../Firebase';
import Application from '../../library/Application';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('email@gmail.com');
    const [password, setPassword] = useState('ust123');
    const [user, setUser] = useState(null);
    const [isLoaded, setLoading] = useState(true);

    const onFooterLinkPress = () => {
        navigation.navigate('RegistrationScreen');
    };

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data();
                        setLoading(false);
                        setUser(userData);
                        Application.getDataStore().setUser(user);
                        navigation.navigate('Home', {user: user, extraData: {id: user.uid}});
                    })
                    .catch((error) => {
                        setLoading(false);
                        alert('error 1' + error);
                    });
            } else {
                setLoading(false);
            }
        });
    }, []);

    const onLoginPress = async () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;

                const usersRef = firebase.firestore().collection('users');
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert('User does not exist anymore.');
                            return;
                        }
                        const user = firestoreDocument.data();
                        user.uid = uid;
                        Application.getDataStore().setUser(user);
                        navigation.navigate('Home', {user: user, extraData: {id: uid}});
                    })
                    .catch(error => {
                        alert('uid' + uid + ' : ' + error);
                    });
            })
            .catch(error => {
                alert(error);
            });
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress}
                                                                                 style={styles.footerLink}>Sign
                        up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
