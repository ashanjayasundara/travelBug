// // const uniRest = require('unirest');
//
// import {firebase} from '../firebase/config';
//
// export default class RestConnection {
//     static reqURL = 'https://rapidapi.p.rapidapi.com/';
//     static  rapidApiHost = 'hotels4.p.rapidapi.com';
//     static  apiKey = 'd404354d9dmsha6fb695182073dfp1a2db6jsn4e3710294d68';
//     static  queryString = true;
//
//    async sendMsg(serviceEndPoint = 'properties/get-hotel-photos', request = {'id': '1178275040'}, type = 'GET') {
//         // let reqHandler = uniRest(type, RestConnection.reqURL + serviceEndPoint);
//         // reqHandler.query(request);
//         // reqHandler.headers({
//         //     'x-rapidapi-host': RestConnection.rapidApiHost,
//         //     'x-rapidapi-key': RestConnection.apiKey,
//         //     'useQueryString': RestConnection.queryString,
//         // });
//         // reqHandler.end(function (res) {
//         //     if (res.error) {
//         //         throw new Error(res.error);
//         //     }
//         //     console.log(res.body);
//         // });
//         // fetch(RestConnection.reqURL + serviceEndPoint+"?id=1178275040", {
//         //     method: type,
//         //     headers: {
//         //         'x-rapidapi-host': RestConnection.rapidApiHost,
//         //         'x-rapidapi-key': RestConnection.apiKey,
//         //         'useQueryString': RestConnection.queryString,
//         //     },
//         //     // body: encodeURIComponent(JSON.stringify(request)),
//         // }).then(response => {
//         //     console.log(response);
//         //     return response.json();
//         // }).then(value => {
//         //     console.log(value + 'asd');
//         // }).catch(reason => {
//         //     console.log('Error : ' + error);
//         // });
//         // firebase.firestore().collection('users').get().then((snapshot) => {
//         //     console.log(snapshot);
//         //     snapshot.docs.forEach(doc => {
//         //         console.log(doc.data());
//         //     });
//         // });
//         this.ref = firebase.firestore().collection('users');
//         this.ref.get()
//             .then(querySnapshot => {
//                 console.log(querySnapshot);
//                 console.log(querySnapshot._docs);
//             });
//
//         const citiesRef = firebase.firestore().collection('cities');
//
//         await citiesRef.doc('SF').set({
//             name: 'San Francisco', state: 'CA', country: 'USA',
//             capital: false, population: 860000,
//             regions: ['west_coast', 'norcal']
//         });
//         await citiesRef.doc('LA').set({
//             name: 'Los Angeles', state: 'CA', country: 'USA',
//             capital: false, population: 3900000,
//             regions: ['west_coast', 'socal']
//         });
//         await citiesRef.doc('DC').set({
//             name: 'Washington, D.C.', state: null, country: 'USA',
//             capital: true, population: 680000,
//             regions: ['east_coast']
//         });
//         await citiesRef.doc('TOK').set({
//             name: 'Tokyo', state: null, country: 'Japan',
//             capital: true, population: 9000000,
//             regions: ['kanto', 'honshu']
//         });
//         await citiesRef.doc('BJ').set({
//             name: 'Beijing', state: null, country: 'China',
//             capital: true, population: 21500000,
//             regions: ['jingjinji', 'hebei']
//         });
//     }
// }
