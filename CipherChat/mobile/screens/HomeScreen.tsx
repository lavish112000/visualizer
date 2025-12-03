import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { theme } from '../theme';

export const HomeScreen = ({ navigation }: any) => {
    // Mock Data
    const chats = [
        { id: '1', name: 'Alice', lastMessage: 'Hey, how are you?', time: '10:30 AM', unread: 2 },
        { id: '2', name: 'Bob', lastMessage: 'Meeting at 3?', time: 'Yesterday', unread: 0 },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={() => navigation.navigate('Chat', { userId: item.name })}
                    >
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{item.name[0]}</Text>
                        </View>
                        <View style={styles.chatInfo}>
                            <View style={styles.chatHeader}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <View style={styles.chatFooter}>
                                <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
                                {item.unread > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.unread}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* FAB for New Chat */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('ContactList')}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    chatItem: {
        flexDirection: 'row',
        padding: theme.spacing.m,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
    },
    avatarText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    name: {
        ...theme.typography.h2,
        fontSize: 16,
    },
    time: {
        ...theme.typography.caption,
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        flex: 1,
        marginRight: theme.spacing.s,
    },
    badge: {
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        right: theme.spacing.l,
        bottom: theme.spacing.l,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.medium,
    },
    fabIcon: {
        fontSize: 32,
        color: '#FFF',
        marginTop: -2,
    },
});
