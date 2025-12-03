import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';

export const SettingsScreen = ({ navigation }: any) => {
    const settingsOptions = [
        { id: 'profile', title: 'Profile', icon: '👤', action: () => navigation.navigate('Profile') },
        { id: 'account', title: 'Account', icon: '🔑', action: () => { } },
        { id: 'chats', title: 'Chats', icon: '💬', action: () => { } },
        { id: 'notifications', title: 'Notifications', icon: '🔔', action: () => { } },
        { id: 'storage', title: 'Storage and Data', icon: '💾', action: () => { } },
        { id: 'help', title: 'Help', icon: '❓', action: () => { } },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <TouchableOpacity style={styles.profileHeader} onPress={() => navigation.navigate('Profile')}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>U</Text>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>User Name</Text>
                    <Text style={styles.status}>Available</Text>
                </View>
            </TouchableOpacity>

            {/* Settings List */}
            <View style={styles.section}>
                {settingsOptions.map((option) => (
                    <TouchableOpacity key={option.id} style={styles.option} onPress={option.action}>
                        <Text style={styles.icon}>{option.icon}</Text>
                        <View style={styles.optionContent}>
                            <Text style={styles.optionTitle}>{option.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
        backgroundColor: theme.colors.surface,
        marginBottom: theme.spacing.m,
        ...theme.shadows.small,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
    },
    avatarText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        ...theme.typography.h2,
        fontSize: 20,
    },
    status: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
    },
    section: {
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border, // Should handle last item border removal in real app
    },
    icon: {
        fontSize: 24,
        marginRight: theme.spacing.m,
        width: 30,
        textAlign: 'center',
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        ...theme.typography.body,
    },
});
