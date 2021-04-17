import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialAvatar from '../components/MaterialAvatar';
import MaterialForm from '../components/MaterialForm';
import { auth } from '../firebase';
import { addNewMaterial, getUserData } from '../lib/queries';
import {
  getMaterialScreenStyles,
  getNavigationOptions,
} from './MaterialScreenFunctions';

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
    navigation.setOptions(getNavigationOptions(material?.title || ''));
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
        <MaterialForm
          material={material}
          updateInputValue={updateInputValue}
          onSubmit={addMaterial}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMaterialScreen;

const styles = getMaterialScreenStyles();
