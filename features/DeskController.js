import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, TextInput} from 'react-native'
import React, { useState, useRef } from 'react'

export default function DeskController() {
    const [deskType, setDeskType] = useState('Classic'); // Interdesk Classic
    const deskSettings = {
        Classic: { // Interdesk Classic's settings
            minHeight: 70,
            maxHeight: 115,
            maxSpeed: 20,
            memoryHeights: [70, 90, 110, 115] // Default memory heights for Interdesk Classic
        },
        Pro: { // Interdesk Pro's settings
            minHeight: 70,
            maxHeight: 120,
            maxSpeed: 35,
            memoryHeights: [70, 90, 110, 120] // Default memory heights for Interdesk Pro
        }
    }

    const { minHeight, maxHeight, maxSpeed} = deskSettings[deskType];
    const [height, setHeight] = useState(minHeight);
    const intervalRef = useRef(null);

    const increaseHeight = () => 
        setHeight(prev => {
            if (prev < maxHeight)
                return prev + 1;
            else 
                Alert.alert('Warning', 'Maximum height ' + maxHeight + 'cm has been reached');
            return prev;              
        }); // Increase height by 1 cm

    const decreaseHeight = () => 
        setHeight(prev => {
            if (prev > minHeight)
                return prev - 1;
            else 
                Alert.alert('Warning', 'Minimum height ' + minHeight + 'cm has been reached');
            return prev;              
        }) // Decrease height by 1 cm

    const startHold = action => {
        action();
        intervalRef.current = setInterval(action, maxSpeed);
    }; // Start holding the button to increase height

    const stopHold = () => {    
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }; // Stop holding the button to stop increasing height

    return (
        <View style = {styles.container}>
            <View style = {styles.selectorContainer}>
                <Text style = {styles.selectorLabel}>Select Desk Type:</Text>
                <View style = {styles.selector}>
                    <TouchableOpacity onPress={() => setDeskType('Classic')} style = {deskType === 'Classic' ? styles.selectedButton : styles.button}>
                        <Text style = {styles.buttonText}>Interdesk Classic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDeskType('Pro')} style = {deskType === 'Pro' ? styles.selectedButton : styles.button}>
                        <Text style = {styles.buttonText}>Interdesk Pro</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style = {styles.heightText}>{height} cm</Text>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    onPressIn={() => startHold(decreaseHeight)}
                    onPressOut={stopHold}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonText}>⬇️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPressIn={() => startHold(increaseHeight)}
                    onPressOut={stopHold}
                    style = {styles.button}
                >
                    <Text style = {styles.buttonText}>⬆️</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.memoryContainer}>
                <Text style = {styles.memoryLabel}>Memory Heights:</Text>
                <View style = {styles.memoryButtons}>
                    {deskSettings[deskType].memoryHeights.map((value, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setHeight(value)}
                            style = {styles.memoryButton}
                        >
                            <Text style = {styles.buttonText}>{value} cm</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View> 

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    selectorContainer: {
        marginBottom: 20,
    },
    selectorLabel: {
        fontSize: 18,
        marginBottom: 10,
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    selectedButton: {
        padding: 10,
        backgroundColor: '#0056b3',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    heightText: {
        fontSize: 24,
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    memoryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    memoryLabel: {
        fontSize: 18,
        marginBottom: 10,
    },
    memoryButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    memoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#6c757d',
        borderRadius: 5,
    }
});
