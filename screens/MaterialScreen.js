import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MaterialScreen = ({ navigation, route }) => {
  const [material, setMaterial] = useState({});
  console.log(route);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.materialName,
      headerBackTitle: 'Back',
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
    });
  }, [navigation]);

  return (
    <View>
      <Text>{route.params.materialName}</Text>
    </View>
  );
};

export default MaterialScreen;

const styles = StyleSheet.create({});
