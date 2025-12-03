import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface MessageBubbleProps {
    text: string;
    isOwnMessage: boolean;
    timestamp?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isOwnMessage, timestamp }) => {
    return (
        <View
            style={[
                styles.container,
                isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer,
            ]}
        >
            <View
                style={[
                    styles.bubble,
                    isOwnMessage ? styles.ownBubble : styles.otherBubble,
                ]}
            >
                <Text
                    style={[
                        styles.text,
                        isOwnMessage ? styles.ownText : styles.otherText,
                    ]}
                >
                    {text}
                </Text>
                {timestamp && (
                    <Text
                        style={[
                            styles.timestamp,
                            isOwnMessage ? styles.ownTimestamp : styles.otherTimestamp,
                        ]}
                    >
                        {timestamp}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 4,
        paddingHorizontal: theme.spacing.m,
    },
    ownMessageContainer: {
        alignItems: 'flex-end',
    },
    otherMessageContainer: {
        alignItems: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s + 2,
        borderRadius: theme.borderRadius.l,
        ...theme.shadows.small,
    },
    ownBubble: {
        backgroundColor: theme.colors.bubble.sent,
        borderBottomRightRadius: 4, // Subtle tail effect
    },
    otherBubble: {
        backgroundColor: theme.colors.bubble.received,
        borderBottomLeftRadius: 4, // Subtle tail effect
    },
    text: {
        ...theme.typography.body,
    },
    ownText: {
        color: theme.colors.text.inverse,
    },
    otherText: {
        color: theme.colors.text.primary,
    },
    timestamp: {
        ...theme.typography.caption,
        marginTop: 4,
        alignSelf: 'flex-end',
        fontSize: 10,
    },
    ownTimestamp: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    otherTimestamp: {
        color: theme.colors.text.secondary,
    },
});
