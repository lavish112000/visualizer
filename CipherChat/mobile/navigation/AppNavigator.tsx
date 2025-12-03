import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../theme';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ContactListScreen } from '../screens/ContactListScreen';
import { ChatScreen } from '../components/ChatScreen'; // Using existing ChatScreen
import { LoginScreen } from '../components/LoginScreen';
import { OTPScreen } from '../components/OTPScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for Main App
const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text.secondary,
                headerStyle: {
                    backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.text.primary,
            }}
        >
            <Tab.Screen
                name="Chats"
                component={HomeScreen}
                options={{ tabBarLabel: 'Chats', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>💬</Text> }}
            />
            <Tab.Screen
                name="Calls"
                component={HomeScreen} // Placeholder
                options={{ tabBarLabel: 'Calls', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📞</Text> }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ tabBarLabel: 'Settings', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⚙️</Text> }}
            />
        </Tab.Navigator>
    );
};

// Root Stack Navigator
export const AppNavigator = ({ isAuthenticated, onLogin, onRegister, onVerify, authState }: any) => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    // Auth Stack
                    <Stack.Group>
                        <Stack.Screen name="Login">
                            {(props) => <LoginScreen {...props} onLogin={onLogin} onRegister={onRegister} isLoading={authState.isLoading} />}
                        </Stack.Screen>
                        <Stack.Screen name="OTP">
                            {(props) => <OTPScreen {...props} phoneNumber={authState.tempPhone} onVerify={onVerify} isLoading={authState.isLoading} onBack={authState.onBack} />}
                        </Stack.Screen>
                    </Stack.Group>
                ) : (
                    // App Stack
                    <Stack.Group>
                        <Stack.Screen name="Main" component={MainTabs} />
                        <Stack.Screen
                            name="Chat"
                            component={ChatScreenWrapper} // Wrapper to pass props
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ContactList"
                            component={ContactListScreen}
                            options={{ title: 'New Chat', headerShown: true }}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{ title: 'Profile', headerShown: true }}
                        />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Wrapper to inject props into ChatScreen (temporary until ChatScreen uses route params fully)
import { Text } from 'react-native';
const ChatScreenWrapper = ({ route, navigation }: any) => {
    const { userId } = route.params;
    // In a real app, we'd fetch messages here or use a store.
    // For now, passing empty or mock.
    return (
        <ChatScreen
            userId="Me"
            recipientId={userId}
            messages={[]}
            onSend={() => { }}
            onBack={() => navigation.goBack()}
        />
    );
};
