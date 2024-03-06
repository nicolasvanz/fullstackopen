import { FlatList, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories, setRepositories] = useState()

  const fetchRepositories = async () => {
    const response = await fetch("http://150.162.151.86:5000/api/repositories")
    const json = await response.json()

    console.log(json)
    setRepositories(json)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(({ item }) => <RepositoryItem item={item}/>)}
    />
  );
};

export default RepositoryList;