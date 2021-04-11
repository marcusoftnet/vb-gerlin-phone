import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#1a3b5f' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

const vasaBandTheme = {
  dark: false,
  colors: {
    primary: '#1a3b5f',
    background: 'white',
    card: '#1a3b5f',
    text: 'white',
    border: 'white',
    notification: '#1a3b5f',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={vasaBandTheme}>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
