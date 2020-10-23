import RestConnection from './RestConnection';
import DataStore from './DataStore';

export default class Application {
    static restConnection = null;
    static dataStore = null;

    //
    // static getConnectionHandler() {
    //     if (Application.restConnection == null) {
    //         Application.restConnection = new RestConnection();
    //     }
    //     return Application.restConnection;
    // }

    static getDataStore() {
        if (Application.dataStore == null) {
            Application.dataStore = new DataStore();
        }
        return Application.dataStore;
    }
}
