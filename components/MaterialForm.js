import React from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';

const MaterialForm = ({ material, updateInputValue, onSubmit }) => {
  return (
    <View>
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
      <Button title='Save' raised onPress={onSubmit} />
    </View>
  );
};

export default MaterialForm;
