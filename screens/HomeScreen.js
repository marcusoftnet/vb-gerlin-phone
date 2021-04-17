import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import HeaderLeftComponent from '../components/HeaderLeftComponent';
import HeaderRightComponent from '../components/HeaderRightComponent';
import SearchResultItem from '../components/SearchResultItem';
import { auth } from '../firebase';
import { searchMusic } from '../lib/queries';

const HomeScreen = ({ navigation }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchString, setSearchString] = useState('');

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
      title: 'Jehrin',
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerLeft: () => <HeaderLeftComponent onSignOut={signOutUser} />,
      headerRight: () => (
        <HeaderRightComponent
          onSignOut={signOutUser}
          onNewMaterial={onNewMaterial}
        />
      ),
    });
  }, [navigation]);

  const updateSearchResult = async () => {
    try {
      const result = await searchMusic(searchString);
      setSearchResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  const showMaterial = (id, materialTitle) => {
    navigation.navigate('Material', { id, materialTitle });
  };

  const onNewMaterial = () => {
    navigation.navigate('AddMaterial');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        style={styles.searchbar}
        placeholder='Search music'
        type='text'
        value={searchString}
        onChangeText={setSearchString}
        onSubmitEditing={updateSearchResult}
        autoFocus={true}
      />
      <Button
        containerStyle={styles.button}
        title='Search'
        onPress={updateSearchResult}
      />

      <ScrollView style={styles.listContainer}>
        {searchResult?.docs.map((material) => (
          <SearchResultItem
            key={material.id}
            id={material.id}
            material={material.data()}
            showMaterial={showMaterial}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  searchbar: {
    position: 'relative',
  },
  listContainer: {},
  button: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
