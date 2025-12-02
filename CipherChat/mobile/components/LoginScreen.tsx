import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
    onLogin: (phone: string, pass: string) => void;
    onRegister: (phone: string, username: string, pass: string) => void;
    isLoading: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister, isLoading }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (isRegistering) {
            onRegister(phoneNumber, username, password);
        } else {
            onLogin(phoneNumber, password);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.contentContainer}>
                {/* Hero Section */}
                <View style={styles.hero}>
                    <LottieView
                        autoPlay
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        // Use a remote Lottie file for the "premium" feel (e.g., a lock or chat animation)
                        // For now, using a placeholder or we can use the one from the sticker demo if valid.
                        // Let's use a generic secure login animation URL if possible, or just a placeholder.
                        source={{ uri: 'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json' }}
                    />
                    <Text style={styles.title}>CipherChat</Text>
                    <Text style={styles.subtitle}>Secure. Private. Encrypted.</Text>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+1234567890"
                            placeholderTextColor="#A0A0A0"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                        />
                    </View>

                    {isRegistering && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Display Name"
                                placeholderTextColor="#A0A0A0"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="words"
                            />
                        </View>
                    )}

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#A0A0A0"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>
                                {isRegistering ? 'Create Account' : 'Sign In'}
                            </Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => setIsRegistering(!isRegistering)}
                    >
                        <Text style={styles.switchText}>
                            {isRegistering
                                ? 'Already have an account? Sign In'
                                : "Don't have an account? Sign Up"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Light gray/blue background
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    hero: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1A1A1A',
        marginTop: 10,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    form: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    button: {
        backgroundColor: '#007AFF', // iOS Blue
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    switchButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    switchText: {
        color: '#666',
        fontSize: 14,
    },
});
