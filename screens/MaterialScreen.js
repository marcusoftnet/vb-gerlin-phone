import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialAvatar from '../components/MaterialAvatar';
import MaterialForm from '../components/MaterialForm';
import { auth } from '../firebase';
import {
  getMaterialById,
  getUserData,
  updateMaterialData,
} from '../lib/queries';
import {
  getMaterialScreenStyles,
  getNavigationOptions,
} from './MaterialScreenFunctions';

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
    navigation.setOptions(
      getNavigationOptions(material?.title || route.params.materialTitle)
    );
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
          <MaterialForm
            material={material}
            updateInputValue={updateInputValue}
            onSubmit={saveMaterial}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MaterialScreen;

const styles = getMaterialScreenStyles();
