import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

export default function DeskController() {
  const [connected, setConnected] = useState(false); // State to track connection status
  const ESP32_IP = "192.168.4.1"; 

  const sendCommand = async (command) => {
    try {
      await axios.get(`http://${ESP32_IP}/${command}`, { timeout: 1000 }); // Send command to ESP32
      console.log(`Command sent: ${command}`);
    } catch (error) {
      setConnected(false); // If there's an error, set connected to false
    }
  };

  // Connection check
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await axios.get(`http://${ESP32_IP}/release`, { timeout: 2000 }); 
        setConnected(true); // If the request is successful, set connected to true
      } catch (error) {
        setConnected(false); // If there's an error, set connected to false
      }
    };
    checkConnection();
    const interval = setInterval(checkConnection, 3000); // Check connection every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Controller</Text>
      <Text style={styles.instruction}>Hold to adjust your desk height!</Text>
      
      <View style={[styles.connectionStatus, {backgroundColor: connected ? '#4CAF50' : '#F44336'}]}>
        <Text style={styles.connectionText}>
          {connected ? 'CONNECTED' : 'DISCONNECTED'}
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPressIn={() => sendCommand("press-down")}
          onPressOut={() => sendCommand("release")}
          style={[styles.button, !connected && styles.disabledButton]}
          disabled={!connected}
        >
          <Image 
            source={require('../assets/down-button.png')} 
            style={styles.buttonImage} 
          />
          <Text style={styles.buttonLabel}>Down</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => sendCommand("press-up")}
          onPressOut={() => sendCommand("release")}
          style={[styles.button, !connected && styles.disabledButton]}
          disabled={!connected}
        >
          <Image 
            source={require('../assets/up-button.png')} 
            style={styles.buttonImage} 
          />
          <Text style={styles.buttonLabel}>Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  instruction: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
  },
  connectionStatus: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  connectionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 120,
    height: 120,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.4,
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  }
});