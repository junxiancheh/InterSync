import StandNotification from '../features/StandNotification';
import { View, Text, ScrollView } from 'react-native';

export default function ActivityPage() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      </View>
      <StandNotification />
      <Text>Features coming soon.</Text>
    </ScrollView>
  );
}