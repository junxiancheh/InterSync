import { StyleSheet, Text, View, Image } from 'react-native';
import DeskController from '../features/DeskController';
import GoalTracker from '../features/GoalTracker';

export default function Homepage({ deskType, setDeskType }) {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>InterSync</Text>
            <Image 
                        source={require('../assets/logo.png')}
                        style={{ width: 100, height: 100, marginBottom: 20 }} 
                      />
            <Text style={styles.subtitle}>Making Ergonomic Workspaces with Technology</Text>
            
            <DeskController deskType={deskType} />
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
        paddingTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#000',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
});