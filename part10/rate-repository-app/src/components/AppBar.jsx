import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.textPrimary
  },
  tab: {
    fontWeight: "bold",
    color: "white",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  }
  // ...
});

const Tab = ({ tabText }) => {
  return <Pressable>
    <Text style={styles.tab}>{tabText}</Text>
  </Pressable>
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Tab tabText="Repositories"/>
    </View>
  );
};

export default AppBar;