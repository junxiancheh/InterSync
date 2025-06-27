import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, } from 'react-native';


export default function StandNotification({ moveToMemoryHeight, memoryHeights }) {
    const DEFAULT_TIME = 30; // Default time in minutes to stand
    const [customMinutes, setCustomMinutes] = useState(DEFAULT_TIME.toString());
    const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME * 60); // Convert to seconds
    const [standMinutes, setStandMinutes] = useState(DEFAULT_TIME);

    const timerRef = useRef(null);

    const startTimer = () => {
        const minutes = parseFloat(customMinutes);
        if (isNaN(minutes) || minutes <= 0) {
            Alert.alert('Invalid Time', `Please enter a valid duration.`);
            return;
        }

        if (minutes > 30) { // 30 minutes
            Alert.alert('Alert', `It's recommended to not sit for more 30 minutes.`)
        };

        if (timerRef.current)
            return; // Prevent multiple timers
        setTimeLeft(minutes * 60);
        timerRef.current = setInterval(() => {
            setTimeLeft((sec) => {
                if (sec <= 0) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    Alert.alert('Alert', `It's time to stand up!`, [
                        {
                            text: 'OK',
                            onPress: () => {
                                //setHeight(memoryHeights[3]); // can't set height yet :(
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
            <Text style={{ marginBottom: 10, fontSize: 16 }}> Custom Duration (in mins) </Text>
            <TextInput
                value={customMinutes}
                onChangeText={setCustomMinutes}
                keyboardType="numeric"
                style={{ borderWidth: 1, width: 150, padding: 10, fontSize: 16, marginBottom: 10}}
                />
            <TouchableOpacity onPress={startTimer} style={styles.button}>
                <Text style={styles.buttonText}>Start Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
                setTimeLeft(DEFAULT_TIME * 60);
                setStandMinutes(DEFAULT_TIME);
            }}
                style={styles.button}>
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
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    resetButton: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
