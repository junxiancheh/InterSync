import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, } from 'react-native';


export default function StandNotification() {
    const DEFAULT_TIME = 45; // Default time in minutes to stand
    const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME * 60); // Convert to seconds
    const [standMinutes, setStandMinutes] = useState(DEFAULT_TIME);
    const timerRef = useRef(null);

    const startTimer = () => {
        if (timerRef.current) 
            return; // Prevent multiple timers
        timerRef.current = setInterval(() => {
            setTimeLeft((sec) => {
                if (sec <= 0) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    Alert.alert('Time to stand up!', 'Your desk will rise now.', [
                        { text: 'OK', 
                            onPress: () => {
                                // setHeight(memoryHeights[4]); // Uncomment and define setHeight and memoryHeights if needed
                                setTimeLeft(DEFAULT_TIME * 60); // Reset timer
                                setStandMinutes(DEFAULT_TIME);
                            }
                        }
                    ]);
                    return 0;
                }
                return sec - 1;
            });
        }, 1000); // Update every second
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stand Notification</Text>
            <Text style={styles.timerText}>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Text>
            <TouchableOpacity onPress={startTimer} style={styles.button}>
                <Text style={styles.buttonText}>Start Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStandMinutes(DEFAULT_TIME)} style={styles.resetButton}>
                <Text style={styles.buttonText}>Reset Timer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    resetButton: {
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
