import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Header} from 'react-native-elements';
import WebView from 'react-native-webview';

export default function LocalStatsScree({navigation}) {
    return (
        <View style={styles.container}>
            <Header
                leftComponent={{icon: 'arrow-left', size: 25, color: '#fff', onPress: () =>   navigation.navigate('Home', {user: {}})}}
                centerComponent={{text: 'Covid 19 Statistics', style: {color: '#fff'}}}
            />
            <WebView
                source={{
                    uri: 'https://hpb.health.gov.lk/covid19-dashboard/',
                }}
                style={{marginTop: 0}}
            />
        </View>
    );
}
