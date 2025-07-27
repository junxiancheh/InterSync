import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import StandNotification from '../features/StandNotification';
import ActivityLogger from '../features/ActivityLogger';
import GoalTracker from '../features/GoalTracker';

const ActivityPage = () => {
  const activityLoggerRef = useRef(null);
  const [showTrends, setShowTrends] = useState(false); // State to toggle trends
  const [timeRange, setTimeRange] = useState('day'); // State to manage time range for activity data
  const [chartData, setChartData] = useState([]); // State to hold chart data 
  const [dailyGoal, setDailyGoal] = useState(120); // Default daily standing goal in minutes
  const [currentStanding, setCurrentStanding] = useState(0); // State to track current standing time

  const updateChartData = useCallback(() => { // Update chart data based on the selected time rang
    if (!activityLoggerRef.current) return;

    try {
      const timeData = activityLoggerRef.current.getTimeData(timeRange);
      setChartData([
        { // Data for the pie chart
          name: "Mins Standing",
          minutes: Math.max(timeData.standing, 0),
          color: '#4CAF50',
          legendFontColor: '#7F7F7F',
          legendFontSize: 14
        },
        {
          name: 'Mins Sitting',
          minutes: Math.max(timeData.sitting, 0),
          color: '#F44336',
          legendFontColor: '#7F7F7F',
          legendFontSize: 14
        }
      ]);
    } catch (error) { // Handle any errors that occur during data retrieval
      console.error('Error updating chart data:', error);
      setChartData([]);
    }
  }, [timeRange]);

  const handleNewStandingTime = useCallback((newStandingTime) => { // Handle new standing time added from the ActivityLogger
    setCurrentStanding(newStandingTime);
    updateChartData();
  }, [updateChartData]);

  useEffect(() => {
    updateChartData();
  }, [timeRange, updateChartData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <GoalTracker
        dailyGoal={dailyGoal}
        setDailyGoal={setDailyGoal}
        currentStanding={currentStanding}
      />

      <StandNotification />
      <ActivityLogger ref={activityLoggerRef}
        onLogAdded={handleNewStandingTime} />


      <TouchableOpacity
        onPress={() => setShowTrends(!showTrends)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleButtonText}>
          {showTrends ? 'Hide Activity Breakdown' : 'Show Activity Breakdown'}
        </Text>
      </TouchableOpacity>

      {showTrends && chartData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            {timeRange === 'day' ? 'Daily' : timeRange === 'week' ? 'Weekly' : 'Monthly'} Activity Breakdown
          </Text>
          <Text style={styles.chartSubtitle}>
            If the chart is not updated, reclick any of the buttons!  </Text>
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
            }}
            accessor="minutes"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            avoidFalseZero
            hasLegend={true}
            legendPosition="right"
            legendOffset={18}
            center={[10, 10]}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              paddingRight: 20,
            }}
          />

          <View style={styles.timeRangeButtons}>
            {['day', 'week', 'month'].map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.rangeButton,
                  timeRange === range && styles.activeRangeButton
                ]}
                onPress={() => setTimeRange(range)}
              >
                <Text style={[
                  styles.rangeButtonText,
                  timeRange === range && styles.activeRangeText
                ]}>
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5'
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    width: Dimensions.get('window').width - 32,
    overflow: 'hidden'
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center'
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center'
  },
  toggleButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center'
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16
  },
  timeRangeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15
  },
  rangeButton: {
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  rangeButtonText: {
    color: '#333',
    fontWeight: '500'
  },
  activeRangeButton: {
    backgroundColor: '#007AFF'
  },
  activeRangeText: {
    color: 'white'
  }
});

export default ActivityPage;