import { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebase'; // Import the auth instance

import Homepage from './screens/Homepage';
import Activitypage from './screens/Activitypage';
import Settings from "./screens/Settings";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ deskType, setDeskType }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Activity') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={20} color="black" />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" children={() => <Homepage deskType={deskType} setDeskType={setDeskType} />} 
        options={{ headerShown: false }} />
      <Tab.Screen name="Activity" children={() => <Activitypage deskType={deskType} />} 
        options={{ headerShown: false }} />
      <Tab.Screen name="Settings" children={() => <Settings deskType={deskType} setDeskType={setDeskType} />} 
        options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [deskType, setDeskType] = useState('Classic');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // CORRECTED: Access onAuthStateChanged directly from the auth instance
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    
    return unsubscribe; // Cleanup subscription
  }, []);

  if (initializing) return null; // Or a loading spinner

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="MainTabs">
            {() => <MainTabs deskType={deskType} setDeskType={setDeskType} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}