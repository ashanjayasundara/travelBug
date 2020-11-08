import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from '../../Firebase';
export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.db = firebase.firestore().collection('users');
        this.state = {
            fullName: 'Ashan Jayasundara',
            email: 'users@sliit.lk',
            password: 'ust123',
            confirmPassword: 'ust123',
        };
    }

    updateTextInput = (text, field) => {
        const state = this.state;
        state[field] = text;
        this.setState(state);
    };

    onRegisterPress = () => {
        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords don\'t match.');
            return;
        }
        const {fullName, email, password} = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                const data = {
                    id: uid,
                    email: email,
                    fullName: fullName,
                };
                this.db.doc(uid).add(data).then((docRef) => {
                    this.props.navigation.navigate('Home', {user: data});
                })
                    .catch((error) => {
                        console.error('Error adding document: ', error);
                        this.setState({
                            isLoading: false,
                        });
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (<View style={styles.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.updateTextInput(text, 'fullName')}
                    value={this.state.fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.updateTextInput(text, 'email')}
                    value={this.state.email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => this.updateTextInput(text, 'password')}
                    value={this.state.password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => this.updateTextInput(text, 'confirmPassword')}
                    value={this.state.confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={this.onFooterLinkPress}
                                                                                  style={styles.footerLink}>Log
                        in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>);
    }

    onFooterLinkPress = () => {
        this.props.navigation.navigate('Login');
    };
}
