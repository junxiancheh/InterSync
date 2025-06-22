import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';   
import { deskSettings } from './DeskSettings';

export default function DeskTypeSelector({ deskType, setDeskType }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Select Desk Type:</Text>
            </View>
            <View style={styles.options}>
                {Object.keys(deskSettings).map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={
                            deskType === type
                                ? { backgroundColor: '#d0d0d0', padding: 10, borderRadius: 5 }
                                : { padding: 10, borderRadius: 5 }
                        }
                        onPress={() => setDeskType(type)}
                    >
                        <Text style={{ color: deskType === type ? 'black' : 'gray' }}>
                            {type}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}



    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginRight: 10,
        },
        options: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 200,
        },
        button: {
            padding: 10,
            backgroundColor: '#007BFF',
            borderRadius: 5,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#0056b3',
            width: 80,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        selectedButton: {
            padding: 10,
            backgroundColor: '#0056b3',
            borderRadius: 5,
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#003f7f',
            width: 80,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
        },
    });