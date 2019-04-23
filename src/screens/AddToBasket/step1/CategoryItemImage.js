import React from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'


class CategoryImageItem extends React.Component {
  constructor(props) {
    super(props)
  }

  onPress = () => {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress()
    }
  }

  render() {
    const { image, onPress, style, children } = this.props

    return (
      <View style={ style }>
        <TouchableOpacity
          style={ styles.container }
          onPress={ this.onPress }>
          <Image
            source={ image }
            resizeMode='contain'
            style={ styles.image } />
          <Text
            style={ styles.text }>
            { children }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  image: {
    height: 90,
    width: 90,
  },
  text: {
    fontSize: 10,
    marginTop: 8,
    textAlign: 'center',
  },
})

export default CategoryImageItem
