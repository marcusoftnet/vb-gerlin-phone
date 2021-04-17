import { StyleSheet } from 'react-native';

const getNavigationOptions = (title) => ({
  title,
  headerBackTitle: 'Search',
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
});

const getMaterialScreenStyles = () => {
  return StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      height: '100%',
    },
    inputContainer: {
      alignContent: 'center',
      width: '90%',
      paddingLeft: 20,
    },
    materialHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 20,
      paddingBottom: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
    },
  });
};

module.exports = {
  getNavigationOptions,
  getMaterialScreenStyles,
};
