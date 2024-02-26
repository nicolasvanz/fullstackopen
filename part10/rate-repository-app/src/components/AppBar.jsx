import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native"

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

const Tab = ({ tabText, linkTo}) => {
  return <Link to={linkTo}>
    <Text fontSize="subheading" style={styles.tab}>{tabText}</Text>
  </Link>
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Tab tabText="Repositories" linkTo="/"/>
      <Tab tabText="Sign In" linkTo="/signin"/>
    </View>
  );
};

export default AppBar;