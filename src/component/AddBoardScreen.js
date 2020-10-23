// import React, {Component} from 'react';
// import {ActivityIndicator, ScrollView, StyleSheet, TextInput, View} from 'react-native';
// import {Button} from 'react-native-elements';
// // import FirebaseHandler from '../firebase/Firebase';
// import firebase from '../Firebase';
//
// class AddBoardScreen extends Component {
//     static navigationOptions = {
//         title: 'Add Board',
//     };
//
//     constructor() {
//         super();
//         this.state = {
//             title: '',
//             description: '',
//             author: '',
//             isLoading: false,
//         };
//     }
//
//     updateTextInput = (text, field) => {
//         const state = this.state;
//         state[field] = text;
//         this.setState(state);
//     };
//
//     saveBoard() {
//         this.setState({
//             isLoading: true,
//         });
//         firebase.auth()
//             .createUserWithEmailAndPassword(this.state.description, this.state.author).then(
//             (response) => {
//                 const uid = response.user.uid;
//                 firebase.firestore().collection('users').doc(uid).set({
//                     title: this.state.title,
//                     description: this.state.description,
//                     author: this.state.author,
//                     id: uid,
//                 }).then((docRef) => {
//                     this.setState({
//                         title: '',
//                         description: '',
//                         author: '',
//                         isLoading: false,
//                     });
//                     // this.props.navigation.goBack();
//                     alert('SUCCESS');
//                 })
//                     .catch((error) => {
//                         console.error('Error adding document: ', error);
//                         this.setState({
//                             isLoading: false,
//                         });
//                     });
//             },
//         ).catch((error) => {
//             alert(error);
//         });
//
//     }
//
//     render() {
//         if (this.state.isLoading) {
//             return (
//                 <View style={styles.activity}>
//                     <ActivityIndicator size="large" color="#0000ff"/>
//                 </View>
//             );
//         }
//         return (
//             <ScrollView style={styles.container}>
//                 <View style={styles.subContainer}>
//                     <TextInput
//                         placeholder={'Full Name'}
//                         value={this.state.title}
//                         onChangeText={(text) => this.updateTextInput(text, 'title')}
//                     />
//                 </View>
//                 <View style={styles.subContainer}>
//                     <TextInput
//                         multiline={true}
//                         numberOfLines={4}
//                         placeholder={'Email'}
//                         value={this.state.description}
//                         onChangeText={(text) => this.updateTextInput(text, 'description')}
//                     />
//                 </View>
//                 <View style={styles.subContainer}>
//                     <TextInput
//                         placeholder={'Password'}
//                         secureTextEntry={true}
//                         value={this.state.author}
//                         onChangeText={(text) => this.updateTextInput(text, 'author')}
//                     />
//                 </View>
//                 <View style={styles.subContainer}>
//                     <TextInput
//                         placeholder={'Confirm Password'}
//                         secureTextEntry={true}
//                         value={this.state.author}
//                         onChangeText={(text) => this.updateTextInput(text, 'author')}
//                     />
//                 </View>
//                 <View style={styles.button}>
//                     {/*<Button*/}
//                     {/*    large*/}
//                     {/*    leftIcon={{name: 'save'}}*/}
//                     {/*    title='Save'*/}
//                     {/*    onPress={() => this.saveBoard()}/>*/}
//                 </View>
//             </ScrollView>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     subContainer: {
//         flex: 1,
//         marginBottom: 20,
//         padding: 5,
//         borderBottomWidth: 2,
//         borderBottomColor: '#CCCCCC',
//     },
//     activity: {
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
//
// export default AddBoardScreen;
