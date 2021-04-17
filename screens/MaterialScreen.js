import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialAvatar from '../components/MaterialAvatar';
import { auth } from '../firebase';
import {
  getMaterialById,
  getUserData,
  updateMaterialData,
} from '../lib/queries';

const MaterialScreen = ({ navigation, route }) => {
  const [material, setMaterial] = useState(null);

  const updateInputValue = (prop, value) => {
    setMaterial((prev) => ({ ...prev, [prop]: value }));
  };

  const saveMaterial = async () => {
    const user = await getUserData(auth.currentUser.uid);
    await updateMaterialData(material, user.data());

    showMessage({
      message: 'Material saved',
      type: 'success',
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: material?.title || route.params.materialTitle,
      headerBackTitle: 'Search',
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchMaterial() {
      const m = await getMaterialById(route.params.id);
      setMaterial({ id: route.params.id, ...m.data() });
    }
    fetchMaterial();
    return () => {
      setMaterial(null);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!material ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <View style={styles.headerContainer}>
            <MaterialAvatar material={material} />
            <Text style={styles.materialHeader}>
              {material.seriesNumber} - {material.title}
            </Text>
          </View>
          <Input
            label='Series number'
            type='text'
            value={material.seriesNumber}
            onChangeText={(text) => updateInputValue('seriesNumber', text)}
          />
          <Input
            label='Title'
            autoFocus
            type='text'
            value={material.title}
            onChangeText={(text) => updateInputValue('title', text)}
          />
          <Input
            label='Composer'
            type='text'
            value={material.composer}
            onChangeText={(text) => updateInputValue('composer', text)}
          />
          <Input
            label='Type'
            type='text'
            value={material.type}
            onChangeText={(text) => updateInputValue('type', text)}
          />
          <Input
            label='Comments'
            multiline={true}
            numberOfLines={4}
            type='text'
            value={material.comments}
            onChangeText={(text) => updateInputValue('comments', text)}
          />
          <Button
            containerStyle={styles.button}
            title='Save'
            raised
            onPress={saveMaterial}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MaterialScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
  },
  inputContainer: {
    alignContent: 'center',
    width: '90%',
    paddingLeft: 20,
  },
  materialHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
