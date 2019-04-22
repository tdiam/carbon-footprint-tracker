import React from 'react'
import { StyleSheet, View } from 'react-native'
import { inject, observer } from 'mobx-react'

import R from 'res/R'
import Bubble from './Bubble'


const bubbles = [
  {
    id: 6,
    size: 70,
    name: 'FRUITS',
    color: '#ffc700',
  },
  {
    id: 5,
    size: 70,
    name: 'FISH',
    color: '#0B6EE2',
  },
  {
    id: 4,
    size: 80,
    name: 'VEGGIES',
    color: '#A9C669',
  },
  {
    id: 3,
    size: 100,
    name: 'EGGS',
    color: '#DC6612',
  },
  {
    id: 2,
    size: 120,
    name: 'DAIRY',
    color: '#828586',
  },
  {
    id: 1,
    size: 160,
    name: 'MEAT',
    color: '#D64F3D',
  },
]


@inject('store')
@observer
class BubbleChart extends React.Component {
  constructor(props) {
    super(props)
    this.touchLog = R.touchLog.bind(this)
  }

  state = {
    selectedBubbleId: undefined,
  }

  getStyledBubbles(bubbles) {
    const positions = [
      ['36%', '85%'],
      ['80%', '20%'],
      ['15%', '60%'],
      ['21%', '30%'],
      ['80%', '75%'],
      ['50%', '50%'],
    ]

    return bubbles.slice().map((bubble, i) => {
      bubble.x = positions[i][0]
      bubble.y = positions[i][1]
      return bubble
    })
  }

  onPressHandler = ({ id, name }) => () => {
    this.touchLog('Home', 'Bubble', name)
    this.setState({ selectedBubbleId: id })
  }

  render() {
    const selected = this.state.selectedBubbleId
    const styledBubbles = this.getStyledBubbles(bubbles)

    return (
      <View style={ styles.container }>
        { styledBubbles.map(bubble => {
          const { id, size, name, color, x, y } = bubble
          return (
            <Bubble
              key={ id }
              size={ size }
              selected={ selected === id }
              name={ name }
              color={ color }
              x={ x }
              y={ y }
              onPress={ this.onPressHandler(bubble) } />
          )
        }) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    width: '100%',
  },
})

export default BubbleChart
