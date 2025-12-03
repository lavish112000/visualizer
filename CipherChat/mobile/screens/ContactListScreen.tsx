import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export const ContactListScreen = ({ navigation }: any) => {
    const contacts = [
        { id: '1', name: 'Alice', status: 'At work' },
        { id: '2', name: 'Bob', status: 'Gym' },
        { id: '3', name: 'Charlie', status: 'Sleeping' },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.contactItem}
                        onPress={() => navigation.navigate('Chat', { userId: item.name })}
                    >
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{item.name[0]}</Text>
                        </View>
                        <View style={styles.contactInfo}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.status}>{item.status}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
    },
    avatarText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    contactInfo: {
        flex: 1,
    },
    name: {
        ...theme.typography.h2,
        fontSize: 16,
    },
    status: {
        ...theme.typography.caption,
    },
});
