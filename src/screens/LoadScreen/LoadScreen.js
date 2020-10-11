import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

export default function LoadScreen({navigation}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                style={{alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'column'}}
                size={'large'} animating={true} color={'#0188CC'}/>
        </View>
    );
}
