import {useState} from "react";  
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import StandNotification from './features/StandNotification';
import DeskController from './features/DeskController';
import { createBottomTabNavigator, NavigationContainer } from '@react-navigation/bottom-tabs';
import { Ionicons }  from '@expo/vector-icons';

import Homepage from './screens/Homepage';
import Activitypage from './screens/Activitypage';
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator(); // Create a bottom tab navigator


export default function App() {

const [deskType, setDeskType] = useState('Classic'); // Default desk type is Interdesk Classic

    return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions = {({ route }) => ({ 
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName; 
                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Activity') {
                                iconName = focused ? 'areachart' : 'areachart-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            }
                            return <Ionicons name = {iconName} size = {32} color = "black" />;
                        }, 
                        tabBarActiveBackgroundColor: '#e0e0e0',
                        tabBarInactiveBackgroundColor: '#f0f0f0',
                    })}
                    > 
                    <Tab.Screen name = "Home" component = {Homepage} />
                    <Tab.Screen name = "Activity" component = {Activitypage} />
                    <Tab.Screen name = "Settings" component = {Settings} />
                </Tab.Navigator>
            </NavigationContainer> /* Bottom navigation tab */
    );
}
// This is the main entry point of the InterSync app, which allows users to toggle between the Stand Notification and Desk Controller features.
