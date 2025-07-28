import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';

const GoalTracker = ({ dailyGoal, setDailyGoal, currentStanding }) => {
    const [goalInput, setGoalInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const progress = Math.min(currentStanding / dailyGoal, 1);
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        if (currentStanding >= dailyGoal && dailyGoal > 0) {
            setShowCelebration(true);
            Animated.timing(fadeAnim, {
                toValue: 1, 
                duration: 1000,
                useNativeDriver: true,
            }).start();
        } else {
            setShowCelebration(false);
            fadeAnim.setValue(0);
        }
    }, [currentStanding, dailyGoal]);

    const handleSetGoal = () => {
        const newGoal = parseInt(goalInput);
        if (!isNaN(newGoal) && newGoal > 0) {
            setDailyGoal(newGoal);
            setGoalInput('');
            setIsEditing(false);
        }
    };

    return (
        <View style={styles.goalContainer}>
            <Text style={styles.sectionTitle}>Daily Standing Goal</Text>

            {isEditing ? (
                <View style={styles.goalInputContainer}>
                    <TextInput
                        style={styles.goalInput}
                        keyboardType="numeric"
                        placeholder={`Current: ${dailyGoal} min`}
                        value={goalInput}
                        onChangeText={setGoalInput}
                        autoFocus={true}
                    />
                    <TouchableOpacity
                        style={styles.setGoalButton}
                        onPress={handleSetGoal}
                    >
                        <Text style={styles.setGoalButtonText}>Set</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setIsEditing(false)}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.goalDisplayContainer}>
                    <Text style={styles.goalText}>
                        Your Goal is <Text style={styles.goalHighlight}>{dailyGoal} minutes</Text>!
                    </Text>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setIsEditing(true)}
                    >
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            )}

            {showCelebration && (
                <Animated.View style={[styles.celebrationContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.celebrationText}>🎉 You've hit your goal! 🎉</Text>
                </Animated.View>
            )}

            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                    Progress: {Math.round(progress * 100)}% ({currentStanding}/{dailyGoal} mins)
                </Text>
                <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    goalContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10
    },
    goalInputContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    goalDisplayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    goalText: {
        fontSize: 16,
        color: '#333'
    },
    goalHighlight: {
        fontWeight: 'bold',
        color: '#007AFF'
    },
    goalInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginRight: 10
    },
    setGoalButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 10
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8
    },
    setGoalButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '500'
    },
    editButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6
    },
    editButtonText: {
        color: '#007AFF',
        fontWeight: '500'
    },
    progressContainer: {
        marginTop: 10
    },
    progressText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#555'
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 5
    },
    celebrationContainer: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center'
    },
    celebrationText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
});

export default GoalTracker;