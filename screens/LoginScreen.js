import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Image, Input, Text } from 'react-native-elements';
import logo from '../assets/logo_vasaband.png';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err));
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image source={logo} style={styles.imageStyles} />
      <Text h3 style={styles.headingStyle}>
        Gerlin music library
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          autoFocus
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          type='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} title='Login' onPress={signIn} />
      {/* <Button
        containerStyle={styles.button}
        type='outline'
        title='Register'
        onPress={() => navigation.navigate('Register')}
      /> */}
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
    paddingTop: 25,
  },
  imageStyles: {
    width: 250,
    height: 89,
  },
  headingStyle: {
    paddingTop: 15,
  },
});
