import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { theme } from '../theme';
import { MessageBubble } from './MessageBubble';
import { Sticker } from './Sticker';

interface ChatScreenProps {
    userId: string;
    recipientId: string;
    messages: Array<{ id: string; text: string; isOwn: boolean; timestamp: string }>;
    onSend: (text: string) => void;
    onBack?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
    userId,
    recipientId,
    messages,
    onSend,
    onBack,
}) => {
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const handleSend = () => {
        if (inputText.trim()) {
            onSend(inputText.trim());
            setInputText('');
        }
    };

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>

                <View style={styles.headerInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{recipientId.substring(0, 2).toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>{recipientId}</Text>
                        <Text style={styles.headerSubtitle}>Online</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.headerAction}>
                    <Text style={{ fontSize: 20 }}>⋮</Text>
                </TouchableOpacity>
            </View>

            {/* Message List */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                style={{ flex: 1 }}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MessageBubble
                            text={item.text}
                            isOwnMessage={item.isOwn}
                            timestamp={item.timestamp}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    style={styles.list}
                />

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton}>
                        <Text style={{ fontSize: 24, color: theme.colors.primary }}>+</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.colors.text.secondary}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />

                    <TouchableOpacity
                        style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                        onPress={handleSend}
                        disabled={!inputText.trim()}
                    >
                        <Text style={styles.sendButtonText}>→</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        ...theme.shadows.small,
        zIndex: 10,
    },
    backButton: {
        padding: theme.spacing.s,
        marginRight: theme.spacing.s,
    },
    backButtonText: {
        fontSize: 32,
        color: theme.colors.primary,
        lineHeight: 32,
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.s,
    },
    avatarText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    headerTitle: {
        ...theme.typography.h2,
        fontSize: 16,
        marginBottom: 2,
    },
    headerSubtitle: {
        ...theme.typography.caption,
        color: theme.colors.success,
    },
    headerAction: {
        padding: theme.spacing.s,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingVertical: theme.spacing.m,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.s,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    attachButton: {
        padding: theme.spacing.s,
        marginRight: theme.spacing.s,
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderRadius: 20,
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s,
        fontSize: 16,
        maxHeight: 100,
        color: theme.colors.text.primary,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: theme.spacing.s,
        ...theme.shadows.small,
    },
    sendButtonDisabled: {
        backgroundColor: theme.colors.border,
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
    },
});
