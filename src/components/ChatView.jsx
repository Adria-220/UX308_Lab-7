import { StyleSheet, View, ScrollView, Text } from 'react-native';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';

export default function ({ scrollToBottom, scrollViewRef, sendMessage, styles, messages, setInputBarText, inputBarText, isTyping }) {
    return (
        <>
            <ScrollView
                ref={scrollViewRef}
                style={styles.messages}
                onContentSizeChange={() => scrollToBottom()}
            >
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        direction={msg.direction}
                        text={msg.text}
                    />
                ))}
                {isTyping && (
                    <View style={typingStyles.container}>
                        <Text style={typingStyles.dot}>●</Text>
                        <Text style={typingStyles.dot}>●</Text>
                        <Text style={typingStyles.dot}>●</Text>
                    </View>
                )}
            </ScrollView>
            <InputBar
                onSendPressed={sendMessage}
                onSizeChange={() => scrollToBottom(false)}
                onChangeText={setInputBarText}
                text={inputBarText}
            />
        </>
    );
}

const typingStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginLeft: 10,
        marginTop: 8,
    },
    dot: {
        fontSize: 18,
        color: '#aaa',
        marginHorizontal: 2,
    },
});