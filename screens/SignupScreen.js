import { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState(''); // Track email input
  const [password, setPassword] = useState(''); // Track password input
  const [confirmPassword, setConfirmPassword] = useState(''); // Track confirm password input
  const [loading, setLoading] = useState(false); // Track loading state
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility

  // Function to handle signup
  const handleSignup = async () => { 
    if (!validateInputs()) return;
    
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };
  // Function to validate input
  const validateInputs = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) { // Check if password is at least 6 characters
      Alert.alert('Error', 'Password should be at least 6 characters'); 
      return false;
    }
    
    if (password !== confirmPassword) { // Check if passwords match
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleAuthError = (error) => {
    let errorMessage = error.message;
    
    switch (error.code) {
      case 'auth/email-already-in-use': // If email is already registered
        errorMessage = 'This email is already registered';
        break;
      case 'auth/weak-password': // If password is too weak
        errorMessage = 'Password should be at least 6 characters';
        break;
      case 'auth/invalid-email': // If the email format is invalid
        errorMessage = 'Please enter a valid email address';
        break;
    }
    
    Alert.alert("Signup Failed", errorMessage);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Account</Text>
        
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!passwordVisible} // Toggle password visibility
            autoComplete="password-new"
          />
          <TouchableOpacity 
            style={styles.visibilityToggle}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Text>{passwordVisible ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry={true}
          autoComplete="password-new"
        />
        
        <TouchableOpacity
          onPress={handleSignup}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            Already have an account? <Text style={styles.loginText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Similar to LoginScreen styles with minor adjustments
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  visibilityToggle: {
    position: 'absolute',
    right: 15,
    padding: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  secondaryButtonText: {
    color: '#666',
  },
  loginText: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
});