import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
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
      title: 'Gerlin - Vasa Band Music library',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => <HeaderLeftComponent onSignOut={signOutUser} />,
      headerRight: () => <HeaderRightComponent onAddChat={addChat} />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar style={styles.searchbar} />
      <ScrollView style={styles.searchResult}></ScrollView>
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
