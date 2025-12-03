import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, LogBox } from 'react-native';
import { SignalService } from './services/SignalService';
import { WebSocketClient } from './services/WebSocketClient';
import { ChatManager } from './services/ChatManager';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppNavigator } from './navigation/AppNavigator';
import { theme } from './theme';

// Ignore specific warnings if needed
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function App() {
  const [userId, setUserId] = useState<string | null>('test-user-1'); // Default to test user
  const [chatManager, setChatManager] = useState<ChatManager | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auth State
  const [tempPhone, setTempPhone] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);

  // Test Mode Init
  useEffect(() => {
    const initTestMode = async () => {
      const mockUserId = 'test-user-1';
      const mockToken = 'mock-token';

      console.log('Initializing in Test Mode...');
      const signalService = new SignalService(mockUserId);
      await signalService.initialize();

      const wsClient = new WebSocketClient(mockUserId);
      const manager = new ChatManager(mockUserId, mockToken, signalService, wsClient);

      wsClient.connect();
      setChatManager(manager);
      setUserId(mockUserId);
      console.log('Test Mode Initialized');
    };
    initTestMode();
  }, []);

  // --- Auth Handlers ---

  const handleLoginInit = async (phone: string, pass: string) => {
    setIsLoading(true);
    setTempPhone(phone);
    setTempPassword(pass);
    setIsRegistration(false);
    try {
      const res = await fetch('http://localhost:8080/auth/login/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, password: pass })
      });
      if (!res.ok) throw new Error('Login failed');
      // Navigation to OTP is handled by the screen calling navigation.navigate('OTP')
      // But we need to update state if we were passing it down. 
      // For now, we assume the LoginScreen will navigate on success.
    } catch (e) {
      alert('Login Error: ' + e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterInit = async (phone: string, username: string, pass: string) => {
    setIsLoading(true);
    setTempPhone(phone);
    setTempUsername(username);
    setTempPassword(pass);
    setIsRegistration(true);

    try {
      const tempService = new SignalService(username);
      const keys = await tempService.initialize();
      const registrationId = keys.registrationId;
      const identityKey = SignalService.arrayBufferToBase64(keys.identityKeyPair.pubKey);

      const res = await fetch('http://localhost:8080/auth/register/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phone,
          username: username,
          password: pass,
          identity_public_key: identityKey,
          registration_id: registrationId
        })
      });

      if (!res.ok) throw new Error('Registration Init failed');
      (window as any).tempKeys = keys;
    } catch (e) {
      alert('Registration Error: ' + e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (otp: string) => {
    setIsLoading(true);
    try {
      const endpoint = isRegistration ? '/auth/register/verify' : '/auth/login/verify';
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: tempPhone, otp })
      });

      if (!res.ok) throw new Error('Verification failed');

      const data = await res.json();
      const token = data.token;
      const userId = data.user_id;

      if (isRegistration) {
        const keys = (window as any).tempKeys;
        if (keys) {
          const signedPreKey = {
            key_id: keys.signedPreKey.keyId,
            public_key: SignalService.arrayBufferToBase64(keys.signedPreKey.keyPair.pubKey),
            signature: SignalService.arrayBufferToBase64(keys.signedPreKey.signature),
          };
          const oneTimePreKeys = keys.preKeys.map((k: any) => ({
            key_id: k.keyId,
            public_key: SignalService.arrayBufferToBase64(k.keyPair.pubKey)
          }));

          await fetch('http://localhost:8080/keys/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              identity_key: SignalService.arrayBufferToBase64(keys.identityKeyPair.pubKey),
              registration_id: keys.registrationId,
              signed_pre_key: signedPreKey,
              one_time_pre_keys: oneTimePreKeys
            })
          });
        }
      }

      const signalService = new SignalService(userId);
      const wsClient = new WebSocketClient(userId);
      const manager = new ChatManager(userId, token, signalService, wsClient);

      wsClient.connect();
      setChatManager(manager);
      setUserId(userId);

    } catch (e) {
      alert('Verification Error: ' + e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <AppNavigator
          isAuthenticated={!!userId}
          onLogin={handleLoginInit}
          onRegister={handleRegisterInit}
          onVerify={handleVerify}
          authState={{
            isLoading,
            tempPhone,
            onBack: () => { } // Handled by nav
          }}
        />
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
