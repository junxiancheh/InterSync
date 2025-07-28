import { useState } from 'react';
import { View, Image, TextInput, Alert, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(''); // Track email input
  const [password, setPassword] = useState(''); // Track email and password input
  const [loading, setLoading] = useState(false); // Track loading state
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility

  // Function to handle login
  const handleLogin = async () => {
    if (!validateInputs()) return;
    
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

// Function to validate input
  const validateInputs = () => {
    if (!email || !password) { 
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Validate email format
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleAuthError = (error) => {
    let errorMessage = error.message;
    
    switch (error.code) {
      case 'auth/user-not-found': // If no user found with the provided email
        errorMessage = 'No account found with this email';
        break;
      case 'auth/wrong-password': // If the password is incorrect
        errorMessage = 'Incorrect password';
        break;
      case 'auth/invalid-email': // If the email format is invalid
        errorMessage = 'Please enter a valid email address';
        break;
      case 'auth/too-many-requests': // If too many login attempts
        errorMessage = 'Too many attempts. Try again later or reset password';
        break;
    }
    
    Alert.alert("Login Failed", errorMessage);
  };

    // Function to handle password reset
  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email first');
      return;
    }
    
    // Send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => Alert.alert('Check your email', 'Password reset link sent'))
      .catch(error => Alert.alert('Error', error.message));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
         <Image source={require('../assets/logo.png')}
                        style={{ width: 100, height: 100, marginBottom: 20, alignSelf: 'center' }} 
                      />
        <Text style={styles.title}>Login</Text>

        
        
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none" 
          keyboardType="email-address" // Ensure email is in lowercase
          autoComplete="email" // Use email autocomplete
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!passwordVisible} // Toggle password visibility
            autoComplete="password"
          />
          <TouchableOpacity 
            style={styles.visibilityToggle}
            onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
          >
            <Text>{passwordVisible ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handlePasswordReset}
          style={styles.textButton}
        >
          <Text style={styles.textButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  textButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textButtonText: {
    color: '#2196f3',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  secondaryButton: {
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
  },
  signUpText: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
});