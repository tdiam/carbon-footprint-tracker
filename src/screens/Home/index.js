import React from 'react'
import { StyleSheet, Text } from 'react-native'

import Screen from 'components/Screen'


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My Carbon Footprint',
  }

  render() {
    return (
      <Screen contentContainerStyle={ styles.container }>
        <Text>Nothing here!</Text>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomeScreen