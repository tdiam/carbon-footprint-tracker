import React from 'react'

import TextButton from 'components/TextButton'


class CategoryItemText extends React.Component {
  constructor(props) {
    super(props)
  }

  onPress = () => {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress()
    }
  }

  render() {
    const { onPress, style, children } = this.props

    return (
      <TextButton
        inverted
        style={ style }
        onPress={ this.onPress }>
        { children }
      </TextButton>
    )
  }
}

export default CategoryItemText
