import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';
import {
  getMaterialById,
  getUserData,
  updateMaterialData,
} from '../lib/queries';

const MaterialScreen = ({ navigation, route }) => {
  const [material, setMaterial] = useState(null);
  const [saved, setSaved] = useState(false);

  const updateInputValue = (prop, value) => {
    setMaterial((prev) => ({ ...prev, [prop]: value }));
  };
  const setSeriesNumber = (text) => updateInputValue('seriesNumber', text);
  const setTitle = (text) => updateInputValue('title', text);
  const setComposer = (text) => updateInputValue('composer', text);
  const setType = (text) => updateInputValue('type', text);
  const setComments = (text) => updateInputValue('comments', text);

  const saveMaterial = async () => {
    const user = await getUserData(auth.currentUser.uid);
    await updateMaterialData(material, user.data());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: material?.title || route.params.materialName,
      headerBackTitle: 'Back',
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
    <View style={styles.container}>
      {!material ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.materialHeader}>
            {material.seriesNumber} - {material.title}
          </Text>
          <Input
            label='Series number'
            type='text'
            value={material.seriesNumber}
            onChangeText={(text) => setSeriesNumber(text)}
          />
          <Input
            label='Title'
            autoFocus
            type='text'
            value={material.title}
            onChangeText={(text) => setTitle(text)}
          />
          <Input
            label='Composer'
            type='text'
            value={material.composer}
            onChangeText={(text) => setComposer(text)}
          />
          <Input
            label='Type'
            type='text'
            value={material.type}
            onChangeText={(text) => setType(text)}
          />
          <Input
            label='Type'
            multiline={true}
            numberOfLines={4}
            type='text'
            value={material.comments}
            onChangeText={(text) => setComments(text)}
          />
          <Button
            containerStyle={styles.button}
            title='Save'
            raised
            onPress={saveMaterial}
          />
        </View>
      )}
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});
