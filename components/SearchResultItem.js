import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import MaterialAvatar from './MaterialAvatar';

const SearchResultItem = ({ id, material, showMaterial }) => {
  return (
    <ListItem
      onPress={() => showMaterial(id, material.title)}
      key={id}
      buttonDivider
    >
      <MaterialAvatar material={material} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {material.seriesNumber}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {material.title}
        </ListItem.Subtitle>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {material.composer}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default SearchResultItem;

const styles = StyleSheet.create({});
