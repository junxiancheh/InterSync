import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";


export default function SettingsPage({ navigation }) {
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            onPress: async () => {
              try {
                await signOut(auth); // Sign out from Firebase
                navigation.navigate('Login'); // Navigate to Login screen
              } catch (error) {
                Alert.alert('Logged Out');
              } 
            },
          }
        ],
        { cancelable: true }
      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

