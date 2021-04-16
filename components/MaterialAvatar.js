import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const MaterialAvatar = ({ material }) => {
  const getTypeLetter = (type) => {
    if (type.trim() === '') return '???';

    if (type.toLowerCase().includes('solo')) return 'Solo';
    if (type.toLowerCase().includes('duet')) return 'Duet';
    if (type.toLowerCase().includes('trio')) return 'Trio';
    if (type.toLowerCase().includes('quartet')) return 'Quart';
    if (type.toLowerCase().includes('selection')) return 'Selec';
    if (type.toLowerCase().includes('fanfare')) return 'Fanf.';
    if (type.toLowerCase().includes('march')) return 'March';
    if (type.toLowerCase().includes('song')) return 'Song';
    if (type.toLowerCase().includes('medley')) return 'Medl.';
    if (type.toLowerCase().includes('tone poem')) return 'T.P.';
    if (type.toLowerCase().includes('overture')) return 'Overt.';
    if (type.toLowerCase().includes('hymn')) return 'Hymn';

    return type[0];
  };
  return (
    <Avatar
      overlayContainerStyle={{ backgroundColor: '#1a3b5f' }}
      size='medium'
      title={getTypeLetter(material.type)}
      titleStyle={{ fontSize: '14px' }}
      icon={{ name: 'music', type: 'font-awesome' }}
    />
  );
};

export default MaterialAvatar;

const styles = StyleSheet.create({
  materialAvatar: {},
});
