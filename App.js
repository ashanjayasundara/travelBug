import {decode, encode} from 'base-64';
import React from 'react';
import {StackNavigator} from 'react-navigation';
// import BoardScreen from './src/component/BoardScreen';
// import BoardDetailScreen from './src/component/BoardDetailScreen';
// import AddBoardScreen from './src/component/AddBoardScreen';
// import EditBoardScreen from './src/component/EditBoardScreen';
import {HomeScreen, LocalStatScreen, LoginScreen, RegistrationScreen,LocationScreen} from './src/screens';

if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}

const mainNavigator = StackNavigator(
    {
        Login: LoginScreen,
        RegistrationScreen: RegistrationScreen,
        Home: HomeScreen,
        LocalStat: LocalStatScreen,
        LocationScreen: LocationScreen,

        // AddBoard: AddBoardScreen,
        // Board: BoardScreen,
        // BoardDetails: BoardDetailScreen,
        // // AddBoard: AddBoardScreen,
        // EditBoard: EditBoardScreen,

    }, {
        headerMode: 'none',
        mode: Platform.OS === 'ios' ? 'card' : 'modal',
        navigationOptions: {
            gestureResponseDistance: {horizontal: 35},
            gesturesEnabled: true,
        },
    },
);

export default mainNavigator;
