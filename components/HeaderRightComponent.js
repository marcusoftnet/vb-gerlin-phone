import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const HeaderRightComponent = ({ onNewMaterial, onSignOut }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={onSignOut}>
        <MaterialIcons name='logout' size={24} color='white' />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={onNewMaterial}>
        <MaterialIcons name='post-add' size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 60,
    marginRight: 20,
    justifyContent: 'space-between',
  },
});
