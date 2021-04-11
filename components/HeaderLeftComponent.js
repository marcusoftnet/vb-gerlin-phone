import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase';

const HeaderLeftComponent = ({ onSignOut }) => {
  return (
    <View style={{ marginLeft: 20 }}>
      <TouchableOpacity onPress={onSignOut} activeOpacity={0.5}>
        <Avatar
          rounded
          siz
          source={{ uri: auth?.currentUser?.photoURL }}
          style={{ color: 'white' }}
        >
          <Text>{auth?.currentUser?.email[0].toUpperCase()}</Text>
        </Avatar>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeftComponent;

const styles = StyleSheet.create({});
