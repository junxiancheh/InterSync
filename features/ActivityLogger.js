import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function ActivityPage() {
    const [standingTime, setStandingTime] = useState(0);
    const [sittingTime, setSittingTime] = useState(0);
    const [activityLog, setActivityLog] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [filter, setFilter] = useState('day');

    const addToLog = () => {
        if (standingTime === 0 && sittingTime === 0) return;
        const newLog = {
            date: new Date().toLocaleString(),
            timestamp: new Date().getTime(),
            standingTime,
            sittingTime,
        };
        setActivityLog([newLog, ...activityLog]); // add to top
        setStandingTime(0);
        setSittingTime(0);
    };
    // Helper function for filtering logs
    const filterLogs = (period) => {
        const now = new Date();
        const currentTime = now.getTime();

        switch (period) {
            case 'day':
                const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
                return activityLog.filter(log => log.timestamp >= startOfDay);
            case 'week':
                const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).getTime();
                return activityLog.filter(log => log.timestamp >= startOfWeek);
            case 'month':
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
                return activityLog.filter(log => log.timestamp >= startOfMonth);
            default:
                return activityLog;
        }
    };

    // Calculating summary statistics
    const calculateSummary = (logs) => {
        const totalStanding = logs.reduce((sum, log) => sum + log.standingTime, 0);
        const totalSitting = logs.reduce((sum, log) => sum + log.sittingTime, 0);

        return {
            totalStanding,
            totalSitting,
            avgStanding: logs.length > 0 ? Math.round(totalStanding / logs.length) : 0,
            avgSitting: logs.length > 0 ? Math.round(totalSitting / logs.length) : 0,
        };
    };

    const filteredLogs = filterLogs(filter);
    const summary = calculateSummary(filteredLogs);

    const renderSummary = () => {
        switch (filter) {
            case 'day':
                return (
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryTitle}>Daily Summary</Text>
                        <View style={styles.divider} />
                        <Text>Total Standing: {summary.totalStanding} min</Text>
                        <Text>Total Sitting: {summary.totalSitting} min</Text>
                    </View>
                );
            case 'week':
                return (
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryTitle}>Weekly Summary</Text>
                        <View style={styles.divider} />
                        <Text>Total Standing: {summary.totalStanding} min</Text>
                        <Text>Total Sitting: {summary.totalSitting} min</Text>
                        <View style={styles.divider} />
                        <Text>Daily Average </Text>
                        <Text>Standing {summary.avgStanding} min | Sitting {summary.avgSitting} min </Text>
                    </View>
                );
            case 'month':
                return (
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryTitle}>Monthly Summary</Text>
                        <View style={styles.divider} />
                        <Text>Total Standing: {summary.totalStanding} min</Text>
                        <Text>Total Sitting: {summary.totalSitting} min</Text>
                        <View style={styles.divider} />
                        <Text>Weekly Average  </Text>
                        <Text>Standing {summary.avgStanding} min | Sitting {summary.avgSitting} min</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.divider} />
            <Text style={styles.title}>Activity Logger</Text>
              <Text style={styles.description}>Track your sitting and standing times using this logger!</Text>
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
            <View style={styles.divider} />
            <Text style={styles.title}>Summary</Text>
            <Text style={styles.description}>The summary page contains your sit-stand habits. Tap below to filter by day, week or month!</Text>
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    onPress={() => setFilter('day')}
                    style={[styles.filterButton, filter === 'day' && styles.activeFilter]}
                >
                    <Text>Day</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setFilter('week')}
                    style={[styles.filterButton, filter === 'week' && styles.activeFilter]}
                >
                    <Text>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setFilter('month')}
                    style={[styles.filterButton, filter === 'month' && styles.activeFilter]}
                >
                    <Text>Month</Text>
                </TouchableOpacity>
            </View>
            {renderSummary()}
            <TouchableOpacity onPress={() => setShowHistory(!showHistory)} style={styles.historyButton}>
                <Text style={styles.historyButtonText}>{showHistory ? 'Hide History' : 'Show History'}</Text>
            </TouchableOpacity>
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
        width: '50%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    button: {
        fontWeight: 'bold',
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 6,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        fontSize: 12,
        marginBottom: 10,
    },
    logEntry: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        width: '100%',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 15,
    },
    filterButton: {
        fontWeight: 'bold',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    activeFilter: {
        backgroundColor: '#aaa'
    },
    summaryContainer: {
        width: '100%',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    summaryTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    historyButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    historyButton: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 6,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    }

});

