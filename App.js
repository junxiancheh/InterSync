import { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

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
                                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            }
                            return <Ionicons name = {iconName} size = {20} color = "black" />;
                        }, 
                        tabBarActiveTintColor: 'black',
                        tabBarInactiveTintColor: 'gray',
                        
                    })}
                >
                    <Tab.Screen name = "Home" children = {() => <Homepage deskType = {deskType} setDeskType = {setDeskType} />} options = {{ headerShown: false }} />
                    <Tab.Screen name = "Activity" children={() => <Activitypage deskType = {deskType} />} options = {{ headerShown: false }} />
                    <Tab.Screen name = "Settings" children={() => <Settings deskType = {deskType} setDeskType = {setDeskType} />} options = {{ headerShown: false }} />
                </Tab.Navigator>
            </NavigationContainer>  
    ); 
    /*
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name = "Home"
                    children={() => <Homepage deskType={ deskType } setDeskType={ setDeskType } />}
                />
                <Tab.Screen
                    name = "Activity"
                    children={() => <Activitypage deskType = { deskType } />}
                />
                <Tab.Screen
                    name = "Settings"
                    children={() => <Settings deskType = { deskType } setDeskType = { setDeskType } />}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
    */
}
// This is the main entry point of the InterSync app, which allows users to toggle between the Stand Notification and Desk Controller features.
