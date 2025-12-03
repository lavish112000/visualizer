import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { theme } from '../theme';

export const ProfileScreen = () => {
    const [name, setName] = useState('User Name');
    const [about, setAbout] = useState('Available');

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{name[0]}</Text>
                </View>
                <TouchableOpacity style={styles.cameraButton}>
                    <Text>📷</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.hint}>This is not your username or pin. This name will be visible to your contacts.</Text>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>About</Text>
                <TextInput
                    style={styles.input}
                    value={about}
                    onChangeText={setAbout}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.phone}>+1 234 567 890</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    avatarContainer: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: theme.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 48,
        color: '#FFF',
        fontWeight: 'bold',
    },
    cameraButton: {
        position: 'absolute',
        bottom: theme.spacing.xl,
        right: '35%',
        backgroundColor: theme.colors.primary,
        padding: 8,
        borderRadius: 20,
    },
    inputGroup: {
        padding: theme.spacing.m,
        backgroundColor: theme.colors.surface,
        marginBottom: theme.spacing.m,
    },
    label: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.xs,
    },
    input: {
        ...theme.typography.body,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary,
        paddingVertical: theme.spacing.s,
    },
    hint: {
        ...theme.typography.caption,
        marginTop: theme.spacing.s,
    },
    phone: {
        ...theme.typography.body,
        paddingVertical: theme.spacing.s,
        color: theme.colors.text.secondary,
    },
});
