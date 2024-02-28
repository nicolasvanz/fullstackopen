import { View, StyleSheet, Image } from "react-native"
import Text from "./Text"

import theme from "../theme"

const numberToPrecisionString = (number) => {
  const precisionMarks = ['', 'k', 'm', 'b']
  let divideTimes = 0
  while (number >= 1000 && divideTimes < precisionMarks.length) {
    divideTimes += 1
    number /= 1000
  }
  return divideTimes === 0 ? `${number}` : `${number.toFixed(1)}${precisionMarks[Math.min(divideTimes, precisionMarks.length - 1)]}`
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginVertical: 1,
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
});

const cardHeaderStyle = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
  },
  info: {
    flexGrow: 3,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginVertical: 5,
    alignSelf: "flex-start",
    color: "white"
  }
})

const cardFooterStyle = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5
  },
  stat: {
    flexDirection: "column",
    alignItems: "center"
  }
})

const RepositotyItemFooterStat = ({ statNumber, statText }) => {
  return (
    <View style={cardFooterStyle.stat}>
      <Text fontWeight="bold">{numberToPrecisionString(statNumber)}</Text >
      <Text color="textSecondary">{statText}</Text>
    </View>
  )
}

const RepositoryItemFooter = (props) => {
  return (
    <View style={cardFooterStyle.footer}>
      {props.children}
    </View>
  )
}

const RepositoryItemHeader = (props) => {
  return (
    <View style={cardHeaderStyle.cardHeader}>
      {props.children}
    </View>
  )
}

const RepositoryItemHeaderInfo = ({ name, description, language }) => {
  return (
    <View style={cardHeaderStyle.info}>
      <Text fontWeight="bold" fontSize="subheading">{name}</Text >
      <Text color="textSecondary" fontSize="subheading">{description}</Text >
      <Text fontSize="subheading" style={cardHeaderStyle.language}>{language}</Text >
    </View>
  )
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <RepositoryItemHeader>
        <Image
          style={cardHeaderStyle.avatar}
          source={{uri: item.ownerAvatarUrl}}
        />
        <RepositoryItemHeaderInfo name={item.fullName} description={item.description} language={item.language} />
      </RepositoryItemHeader>

      <RepositoryItemFooter>
        <RepositotyItemFooterStat statNumber={item.stargazersCount} statText="Stars"/>
        <RepositotyItemFooterStat statNumber={item.forksCount} statText="Forks"/>
        <RepositotyItemFooterStat statNumber={item.reviewCount} statText="Reviews"/>
        <RepositotyItemFooterStat statNumber={item.ratingAverage} statText="Rating"/>
      </RepositoryItemFooter>

    </View>
  )
}

export default RepositoryItem
