import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase';

const HeaderLeftComponent = ({ onSignOut }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSignOut} activeOpacity={0.5}>
        <Avatar
          rounded
          title={auth?.currentUser?.email[0].toUpperCase()}
          size='medium'
          onPress={onSignOut}
          activeOpacity={0.7}
          containerStyle={{ flex: 2 }}
          overlayContainerStyle={{ backgroundColor: '#1a3b5f' }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeftComponent;

const styles = StyleSheet.create({
  avatar: {
    color: '#000',
  },
  container: {
    marginLeft: 20,
  },
});
