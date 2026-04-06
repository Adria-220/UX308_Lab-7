import { View, Text, StyleSheet } from 'react-native';
import InputBar from "./InputBar"

export default function({ scrollToBottom, sendMessage, setInputBarText, inputBarText }) {
    return (
        <View style={styles.container}>
            <View style={styles.welcomeBox}>
                <Text style={styles.emoji}>🧪</Text>
                <Text style={styles.title}>Acton Rapid Test</Text>
                <Text style={styles.subtitle}>Hello! I can help you get a rapid test kit. Type anything to get started!</Text>
            </View>
            <InputBar
                onSendPressed={sendMessage}
                onSizeChange={() => scrollToBottom(false)}
                onChangeText={setInputBarText}
                text={inputBarText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    welcomeBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    emoji: {
        fontSize: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
});