// import React, {Component} from 'react';
// import {View} from 'react-native';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// import {Header} from 'react-native-elements';
// import styles from './styles';
//
// export default class LocationScreen extends Component {
//     constructor(props) {
//         super(props);
//         const { params } = props.navigation.state;
//         this.item = params.item;
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Header
//                     leftComponent={{
//                         icon: 'arrow-left',
//                         size: 25,
//                         color: '#fff',
//                         onPress: () => this.props.navigation.navigate('Home'),
//                     }}
//                     containerStyle={{height: 80}}
//                     centerComponent={{text: this.item.name, style: {color: '#fff'}}}
//                 />
//
//                 <MapView
//                     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//                     style={styles.map}
//                     region={{ //40.741895,-73.989308
//                         latitude:40.741895, //37.78825,
//                         longitude: -73.989308, //-122.4324,
//                         latitudeDelta: 0.015,
//                         longitudeDelta: 0.0121,
//                     }}
//                 >
//                 </MapView>
//             </View>
//         );
//     }
// }

import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, ProviderPropType} from 'react-native-maps';
import flagBlueImg from '../../../assets/flag-blue.png';
import flagPinkImg from '../../../assets/flag-pink.png';
import {Header} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.421998333333335;
const LONGITUDE = -122.08400000000002;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class MarkerTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marker1: true,
            marker2: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{
                        icon: 'arrow-left',
                        size: 25,
                        color: '#fff',
                        onPress: () => this.props.navigation.navigate('Home'),
                    }}
                    containerStyle={{height: 80}}
                    centerComponent={{text:'Ashan Location Info', style: {color: '#fff'}}}
                />
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker
                        onPress={() => this.setState({marker1: !this.state.marker1})}
                        coordinate={{
                            latitude: LATITUDE + SPACE,
                            longitude: LONGITUDE + SPACE,
                        }}
                        centerOffset={{x: -18, y: -60}}
                        anchor={{x: 0.69, y: 1}}
                        image={this.state.marker1 ? flagBlueImg : flagPinkImg}
                    >
                        <Text style={styles.marker}>X</Text>
                    </Marker>
                    <Marker
                        onPress={() => this.setState({marker2: !this.state.marker2})}
                        coordinate={{
                            latitude: LATITUDE - SPACE,
                            longitude: LONGITUDE - SPACE,
                        }}
                        centerOffset={{x: -42, y: -60}}
                        anchor={{x: 0.84, y: 1}}
                        image={this.state.marker2 ? flagBlueImg : flagPinkImg}
                    />
                    <Marker
                        onPress={() => this.setState({marker2: !this.state.marker2})}
                        coordinate={{
                            latitude: LATITUDE + SPACE,
                            longitude: LONGITUDE - SPACE,
                        }}
                        centerOffset={{x: -42, y: -60}}
                        anchor={{x: 0.84, y: 1}}
                        opacity={0.6}
                        image={this.state.marker2 ? flagBlueImg : flagPinkImg}
                    />
                </MapView>
            </View>
        );
    }
}

MarkerTypes.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: height - 80,
        marginTop: 80,
    },
    marker: {
        marginLeft: 46,
        marginTop: 33,
        fontWeight: 'bold',
    },
});

export default MarkerTypes;

