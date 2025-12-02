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
} from 'react-native';

interface OTPScreenProps {
    phoneNumber: string;
    onVerify: (otp: string) => void;
    isLoading: boolean;
    onBack: () => void;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({ phoneNumber, onVerify, isLoading, onBack }) => {
    const [otp, setOtp] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.subtitle}>
                    Enter the 6-digit code sent to {phoneNumber}
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="000000"
                        placeholderTextColor="#CCC"
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="number-pad"
                        maxLength={6}
                        autoFocus
                        textAlign="center"
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onVerify(otp)}
                    disabled={isLoading || otp.length !== 6}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Verify Code</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingVertical: 20,
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        letterSpacing: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    button: {
        width: '100%',
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
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
    backButton: {
        marginTop: 20,
        padding: 10,
    },
    backText: {
        color: '#888',
        fontSize: 14,
    },
});
