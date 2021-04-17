import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialAvatar from '../components/MaterialAvatar';
import { auth } from '../firebase';
import { addNewMaterial, getUserData } from '../lib/queries';

const AddMaterialScreen = ({ navigation }) => {
  const initialMaterial = {
    seriesNumber: '',
    title: '',
    composer: '',
    type: '',
    comments: '',
  };
  const [material, setMaterial] = useState(initialMaterial);

  const updateInputValue = (prop, value) => {
    setMaterial((prev) => ({ ...prev, [prop]: value }));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: material?.title || '',
      headerBackTitle: 'Search',
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
    });
  }, [navigation]);

  const addMaterial = async () => {
    try {
      const user = await getUserData(auth.currentUser.uid);
      const materialId = await addNewMaterial(material, user.data());

      showMessage({
        message: 'Material created',
        type: 'success',
      });

      navigation.replace('Material', {
        id: materialId,
        materialTitle: material.title,
      });
    } catch (error) {
      showMessage({
        message: error.message,
        type: 'error',
      });
    }
  };

  const getMaterialHeader = (material) => {
    if (material.seriesNumber !== '' && material.title !== '') {
      return `${material.seriesNumber} - ${material.title}`;
    }
    return '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.headerContainer}>
          <MaterialAvatar material={material} />
          <Text style={styles.materialHeader}>
            {getMaterialHeader(material)}
          </Text>
        </View>
        <Input
          label='Series number'
          autoFocus
          type='text'
          value={material.seriesNumber}
          onChangeText={(text) => updateInputValue('seriesNumber', text)}
        />
        <Input
          label='Title'
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
          onPress={addMaterial}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMaterialScreen;

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
