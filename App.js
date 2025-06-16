import React, {useState} from "react";  
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import StandNotification from './features/StandNotification';
import DeskController from './features/DeskController';

export default function App() {
    const [showNotification, setShowNotification] = useState(false);
    const [showController, setShowController] = useState(false);

    return (
        <View style={styles.container}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => setShowNotification(!showNotification)}
            >
                <Text style={styles.buttonText}>Stand Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => setShowController(!showController)}
            >
                <Text style={styles.buttonText}>Desk Controller</Text>
            </TouchableOpacity>
            {showNotification && <StandNotification />}
            {showController && <DeskController />}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20, 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 60,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
// This is the main entry point of the InterSync app, which allows users to toggle between the Stand Notification and Desk Controller features.

