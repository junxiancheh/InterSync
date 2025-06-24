import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { deskSettings } from './DeskSettings';

export default function DeskController({ deskType }) {
  //const [selectedDeskType, setSelectedDeskType] = useState(deskType); // State to track the selected desk type  
  const [height, setHeight] = useState(deskSettings[deskType].minHeight);
  const [moving, setMoving] = useState(false); 

  const { minHeight, maxHeight, maxSpeed, memoryHeights } = deskSettings[deskType];
  const intervalRef = useRef(null);
 
  useEffect(() => {
    setHeight(deskSettings[deskType].minHeight);
  }, [deskType]);

  const stopCurrentInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Clear the reference to the interval
      setMoving(false);
    }
  };

  const moveToMemoryHeight = (targetHeight) => {
    stopCurrentInterval(); // Stop any ongoing movement when pressed

    if (height === targetHeight || intervalRef.current) {
      Alert.alert('Alert', `Desk is already at ${targetHeight} cm.`);
      return; // Prevent multiple intervals or if already at target height
    }

    Alert.alert('Memory Height Pressed', `Setting height to ${targetHeight} cm... `); // Alert user about the movement
    setMoving(true); // Set moving state to true

    const step = height < targetHeight ? 1 : -1; // if  height is less than targetHeight, increase height, otherwise decrease it
    const intervalTime = 1000 / (maxSpeed / 10); // Calculate interval time based on maxSpeed

    intervalRef.current = setInterval(() => {
      setHeight((prev) => {
        const next = prev + step;
        if ((step > 0 && next >= targetHeight) || (step < 0 && next <= targetHeight)) {
          stopCurrentInterval();
          return targetHeight; // Stop at target height
        }
        return next; // Continue moving towards target height
      });
    }, intervalTime);
  }; // Move to a memory height 

  const startHold = (direction) => {
    stopCurrentInterval(); // Stop any ongoing movement when button is pressed
    setMoving(true);

    const step = direction === 'up' ? 1 : -1; // Determine interval based on direction
    const intervalTime = 1000 / (maxSpeed / 10); // Calculate interval time based on maxSpeed

    intervalRef.current = setInterval(() => {
      setHeight(prev => {
        const next = prev + step;
        if ((step > 0 && next > maxHeight) || (step < 0 && next < minHeight)) {
          stopCurrentInterval(); // Stop the interval if limits are reached
          Alert.alert('Warning', `Height must be between ${minHeight}cm and ${maxHeight}cm`);
          return prev; // Stop at the limits
        }
        return next; // Continue increasing or decreasing height
      });
    }, intervalTime);;
  };

  const stopHold = () => {
    stopCurrentInterval(); // Stop the interval when button is released
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heightText}>Current Height</Text>
      <Text style={styles.heightText}>{height} cm</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPressIn={() => startHold('down')}
          onPressOut={stopHold}
          style={styles.button}
        >
          <Image source={require('../assets/downButton.png')} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => startHold('up')}
          onPressOut={stopHold}
          style={styles.button}
        >
          <Image source={require('../assets/upButton.png')} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.memoryContainer}>
        <Text style={styles.memoryLabel}>Memory Heights:</Text>
        <View style={styles.memoryButtons}>
          {(memoryHeights).map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => moveToMemoryHeight(value)}
              style={styles.memoryButton}
            >
              <Text style={styles.buttonText}>{value} cm</Text>
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
    padding: 30,
  },
  selectorContainer: {
    marginBottom: 30,
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
    padding: 50,
    borderRadius: 5,
  },
  selectedButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  heightText: {
    fontSize: 30,
    marginVertical: 10,
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
    backgroundColor: '#000',
    borderRadius: 5,
  },
  memoryButtonText: {
    color: '#000',
    fontSize: 16,
  },

})
