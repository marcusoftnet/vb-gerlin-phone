import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const HeaderRightComponent = ({ onAddMaterial }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={onAddMaterial}>
        <MaterialIcons name='post-add' size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 20,
    marginRight: 20,
  },
});
