import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Keyboard, Platform, Text } from 'react-native';
import { handleInput } from '../Order';
import ChatView from './ChatView';
import WelcomeView from './WelcomeView';

export default function () {
    const [messages, setMessages] = useState([]);
    const [inputBarText, setInputBarText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollViewRef = useRef(null);

    const scrollToBottom = (animated = true) => {
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated });
        }, 100);
    };

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => scrollToBottom());
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => scrollToBottom());
        scrollToBottom(false);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const sendMessage = () => {
        if (inputBarText.trim().length === 0) return;

        // Add the user's message immediately
        const userMessage = { direction: 'right', text: inputBarText };
        const currentInput = inputBarText;
        setMessages(prev => [...prev, userMessage]);
        setInputBarText('');

        // Show typing indicator after a short delay
        setIsTyping(true);

        setTimeout(() => {
            const aResponse = handleInput(currentInput);
            const responseMessages = aResponse.map(msg => ({ direction: 'left', text: msg }));
            setIsTyping(false);
            setMessages(prev => [...prev, ...responseMessages]);
        }, 1500); // 1.5 second delay to simulate thinking
    };

    return (
        <View style={styles.outer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {messages.length || isTyping ? (
                    <ChatView
                        scrollToBottom={scrollToBottom}
                        sendMessage={sendMessage}
                        scrollViewRef={scrollViewRef}
                        styles={styles}
                        messages={messages}
                        setInputBarText={setInputBarText}
                        inputBarText={inputBarText}
                        isTyping={isTyping}
                    />
                ) : (
                    <WelcomeView
                        scrollToBottom={scrollToBottom}
                        sendMessage={sendMessage}
                        scrollViewRef={scrollViewRef}
                        styles={styles}
                        messages={messages}
                        setInputBarText={setInputBarText}
                        inputBarText={inputBarText}
                    />
                )}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    messages: {
        flex: 1
    },
});