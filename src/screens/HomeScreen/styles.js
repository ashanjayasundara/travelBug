import {Dimensions, StyleSheet} from 'react-native';


const {height, width} = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 10,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor:'#FFF',
        width: width,
    },
    entityText: {
        fontSize: 20,
        color: '#333333',
    },
    entityTextSmall: {
        fontSize: 14,
        color: '#333333',
    },
});
