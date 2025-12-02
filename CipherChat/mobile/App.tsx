import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, SafeAreaView } from 'react-native';
import { SignalService } from './services/SignalService';
import { WebSocketClient } from './services/WebSocketClient';
import { ChatManager } from './services/ChatManager';
import { Sticker } from './components/Sticker';

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [chatManager, setChatManager] = useState<ChatManager | null>(null);

  // Registration State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  // Chat State
  const [recipientId, setRecipientId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const handleRegister = async () => {
    addLog(`Registering ${username} (${phoneNumber})...`);
    // Mock Registration
    // In real app: POST /auth/register
    const mockUserId = 'user-' + Math.floor(Math.random() * 10000);
    setUserId(mockUserId);
    addLog(`Registered as ${mockUserId}`);

    // Initialize Services
    const signalService = new SignalService(mockUserId);
    const wsClient = new WebSocketClient(mockUserId);
    const manager = new ChatManager(mockUserId, signalService, wsClient);

    wsClient.connect();
    setChatManager(manager);
  };

  const handleSend = async () => {
    if (!chatManager || !recipientId) return;
    try {
      await chatManager.sendMessage(recipientId, messageText);
      addLog(`Sent to ${recipientId}: ${messageText}`);
      setMessageText('');
    } catch (e) {
      addLog(`Error sending: ${e}`);
    }
  };

  if (!userId) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>CipherChat Registration</Text>
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <Button title="Register" onPress={handleRegister} />
        <FlatList data={logs} renderItem={({ item }) => <Text>{item}</Text>} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Logged in as: {userId}</Text>
      <View style={styles.chatContainer}>
        <TextInput
          placeholder="Recipient ID"
          value={recipientId}
          onChangeText={setRecipientId}
          style={styles.input}
        />
        <TextInput
          placeholder="Message"
          value={messageText}
          onChangeText={setMessageText}
          style={styles.input}
        />
        <Button title="Send" onPress={handleSend} />
      </View>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={styles.subheader}>Sticker Demo:</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Sticker
            fileId="https://raw.githubusercontent.com/TelegramBots/book/master/src/docs/sticker-tgs.tgs" // Mock Lottie URL
            isAnimated={true}
            size={100}
          />
          <Sticker
            fileId="https://telegram.org/file/464001326/1/b3c/4a5b6c7d8e9f0a1b2c.webp" // Mock WebP URL
            isAnimated={false}
            size={100}
          />
        </View>
      </View>

      <Text style={styles.subheader}>Logs:</Text>
      <FlatList
        data={logs}
        renderItem={({ item }) => <Text style={styles.log}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  chatContainer: {
    marginBottom: 20,
  },
  log: {
    fontSize: 12,
    color: '#555',
  }
});
