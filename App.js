import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { TextInput } from 'react-native';

export default function App() {
  const MIN_HEIGHT = 70; // set min height. need to consider different tables
  const MAX_HEIGHT = 120; // set max height. need to consider different tables
  const MAX_SPEED = 200; // set max speed. need to consider different tables
  const [height, setHeight] = useState(70); // initial height
  const intervalRef = useRef(null);

  const increaseHeight = () => {
    setHeight(prev => {
      if (prev < MAX_HEIGHT) return prev + 1;
      Alert.alert('Warning', 'Maximum height ' + MAX_HEIGHT + ' reached'); // max height warning
      return prev;
    });
  };

  const decreaseHeight = () => {
    setHeight(prev => {
      if (prev > MIN_HEIGHT) return prev - 1;
      Alert.alert('Warning', 'Minimum height ' + MIN_HEIGHT + ' reached'); // min height warning
      return prev;
    });
  };

  const startHold = (action) => {
    action();
    intervalRef.current = setInterval(action, MAX_SPEED);
  };

  const stopHold = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const setMemoryHeight = (value) => {
    setHeight(value);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Standing Desk Height</Text>
      <Text style={styles.heightText}>{height} cm</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPressIn={() => startHold(decreaseHeight)}
          onPressOut={stopHold}
          style={styles.button}
        >
          <Text style={styles.buttonText}>⬇️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={() => startHold(increaseHeight)}
          onPressOut={stopHold}
          style={styles.button}
        >
          <Text style={styles.buttonText}>⬆️</Text>
        </TouchableOpacity>
      </View>
      {/* Memory buttons hidden for future development */}
      {/*
      <View style={styles.memoryContainer}>
        {[60, 80, 100, 120].map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.memoryButton}
            onPress={() => setMemoryHeight(value)}
          >
            <Text style={styles.memoryText}>{index + 1}</Text>
            <Text style={styles.memoryHeight}>{value} cm</Text>
          </TouchableOpacity>
        ))}
      </View>
      */}
      <View>
        <Text style={{ color: '#888', fontSize: 20, marginTop: 20 }}>
          Long press to adjust height
        </Text>
        <Text style={{ color: '#888', fontSize: 20, marginTop: 10 }}>
          Desk Type: Classic
        </Text>
        <Text style={{ color: '#888', fontSize: 20, marginTop: 10 }}>
          Max speed: {MAX_SPEED/10} m/s 
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  heightText: {
    fontSize: 40,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: -10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  memoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  memoryButton: {
    backgroundColor: '#000',
    padding: 12,
    margin: 8,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  memoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  memoryHeight: {
    color: '#ccc',
    fontSize: 14,
  },
});
