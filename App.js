import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const theme = {
  colors: {
    primary: '#1a3b5f',
    secondary: '#000',
  },
};

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#1a3b5f' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
