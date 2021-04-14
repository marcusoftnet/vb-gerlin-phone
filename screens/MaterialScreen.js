import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MaterialScreen = ({ navigation, id }) => {
  const [material, setMaterial] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'apa',
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
    });
  }, [navigation]);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default MaterialScreen;

const styles = StyleSheet.create({});
