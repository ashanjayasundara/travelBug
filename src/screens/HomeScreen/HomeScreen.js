import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import firebase from '../../Firebase';
import Application from '../../library/Application';
import {Header, Rating} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

const hotelIcon = require('../../../assets/hotelIcon.png');
const wildIcon = require('../../../assets/wildIcon.png');
const spaIcon = require('../../../assets/spaIcon.jpg');
const castleIcon = require('../../../assets/castleIcon.png');

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('');
    const [entities, setEntities] = useState([]);

    const entityRef = firebase.firestore().collection('travel');
    const userID = Application.getDataStore().getUser();

    useEffect(() => {
        entityRef.onSnapshot(snapshot => {
            const entries = [];
            snapshot.forEach(doc => {
                const entity = doc.data();
                entity.id = doc.id;
                entries.push(entity);
            });
            setEntities(entries);
        }, error => {
            console.log(error);
        });
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                Application.getDataStore().persistData(position);
                // alert(initialPosition);
            },
            error => alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }, []);

    const searchDestination = () => {
        entityRef
            .where('destination', '==', entityText)
            .onSnapshot(
                snapshot => {
                    const entries = [];
                    snapshot.forEach(doc => {
                        const entity = doc.data();
                        entity.id = doc.id;
                        entries.push(entity);
                    });
                    setEntities(entries);
                },
                error => {
                    console.log(error);
                },
            );
    };

    const getIcon = (type) => {
        switch (type) {
            case 'spa':
                return spaIcon;
            case 'wild':
                return wildIcon;
            case 'castle':
                return castleIcon;
            default:
                return hotelIcon;
        }
    };
    const renderEntity = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('LocationScreen', {item: item})}>
                <View style={styles.entityContainer}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={getIcon(item.type)}
                            resizeMode={'contain'}
                            style={{height: 80, width: 80}}
                        />
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-start', flexDirection: 'column'}}>
                        <Text style={[styles.entityText, {color: '#0188CC'}]}>
                            {item.name}
                            <Text style={[styles.entityTextSmall]}> {item.type} @ {item.destination}</Text>
                        </Text>
                        <Text style={[styles.entityTextSmall]}>Category : {item.category} Price :
                            ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={[styles.entityTextSmall, {color: '#0AA699'}]}>Price :
                                ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Text>
                            <Rating imageSize={15} fractions="{1}" style={{marginLeft: 15}}
                                    startingValue={item.rate}
                                    showRating={false}
                                    starStyle={{backgroundColor: 'transparent'}}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                leftComponent={{icon: 'menu', color: '#fff', onPress: () => props.navigation.navigate('LocalStat')}}
                centerComponent={{text: 'Travel With Covid', style: {color: '#fff'}}}
                rightComponent={{
                    icon: 'home',
                    color: '#fff',
                    onPress: () => props.navigation.navigate('LocationScreen'),
                }}
            />
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Search Destination'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={searchDestination}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {entities.length > 0 && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    );
}
