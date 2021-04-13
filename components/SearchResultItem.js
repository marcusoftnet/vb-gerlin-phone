import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SearchResultItem = ({ material, showMaterial }) => {
  return (
    <View>
      <Text>{material.title}</Text>
    </View>
  );
};

export default SearchResultItem;

const styles = StyleSheet.create({});
