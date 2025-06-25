import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function ActivityPage() {
    const [standingTime, setStandingTime] = useState(0);
    const [sittingTime, setSittingTime] = useState(0);
    const [activityLog, setActivityLog] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const addToLog = () => {
        if (standingTime === 0 && sittingTime === 0) return;
        const newLog = {
            date: new Date().toLocaleString(),
            standingTime,
            sittingTime,
        };
        setActivityLog([newLog, ...activityLog]); // add to top
        setStandingTime(0);
        setSittingTime(0);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Activity Logger</Text>
            <Text> Enter sitting time in minutes </Text>
            <TextInput
                keyboardType="numeric"
                value={sittingTime.toString()}
                onChangeText={(text) => setSittingTime(Number(text) || 0)}
                placeholder="Enter sitting time in minutes"
                style={styles.input}
            />
            <Text> Enter standing time in minutes </Text>
            <TextInput
                keyboardType="numeric"
                value={standingTime.toString()}
                onChangeText={(text) => setStandingTime(Number(text) || 0)}
                placeholder="Enter standing time in minutes"
                style={styles.input}
            />

            <TouchableOpacity onPress={addToLog} style={styles.button}>
                <Text style={styles.buttonText}>Add to Log</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowHistory(!showHistory)} style={styles.button}>
                <Text style={styles.buttonText}>{showHistory ? 'Hide History' : 'Show History'}</Text>
            </TouchableOpacity> 

            {showHistory && (
                <View style={{ width: '100%' }}>
                    <Text style={styles.subTitle}>Activity Log</Text>
                    {activityLog.map((entry, index) => (
                        <View key={index} style={styles.logEntry}>
                            <Text>{entry.date}</Text>
                            <Text>Standing: {entry.standingTime} min</Text>
                            <Text>Sitting: {entry.sittingTime} min</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 6,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    subTitle: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    logEntry: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        width: '100%',
    },
});

