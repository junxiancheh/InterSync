import { StyleSheet, Text, View } from 'react-native';
import DeskController from '../features/DeskController';
import DeskTypeSelector from "../features/DeskTypeSelector";

export default function Homepage({ deskType, setDeskType }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>InterSync</Text>
            <Text style={styles.subtitle}>Making Ergonomic Workspaces with Technology</Text>
           <DeskTypeSelector deskType={deskType} setDeskType={setDeskType} />
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