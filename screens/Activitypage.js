import StandNotification from '../features/StandNotification';
import ActivityLogger from '../features/ActivityLogger';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';


export default function ActivityPage() {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      </View>
      <StandNotification />
      <ActivityLogger />
      <Text>Goal features coming soon.</Text>
    </ScrollView>
  )
}
