import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import HeaderLeftComponent from '../components/HeaderLeftComponent';
import HeaderRightComponent from '../components/HeaderRightComponent';
import { auth } from '../firebase';

const HomeScreen = ({ navigation }) => {
  const [materials, setMaterials] = useState([]);

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((err) => alert(err.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Gerlin - Search',
      headerStyle: { backgroundColor: '#1a3b5f' },
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerLeft: () => <HeaderLeftComponent onSignOut={signOutUser} />,
      headerRight: () => <HeaderRightComponent />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home!</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  searchbar: {},
  searchResult: {},
});
