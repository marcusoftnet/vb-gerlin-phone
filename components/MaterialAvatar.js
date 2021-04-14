import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const MaterialAvatar = ({ material }) => {
  return (
    <Avatar
      overlayContainerStyle={{ backgroundColor: '#1a3b5f' }}
      material
      size='medium'
      title={material.type[0]}
    />
  );
};

export default MaterialAvatar;

const styles = StyleSheet.create({
  materialAvatar: {},
});
