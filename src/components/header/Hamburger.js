import React from 'react'
import { withNavigation } from 'react-navigation'
import { inject, observer } from 'mobx-react'

import R from 'res/R'
import IconButton from '../IconButton'


@withNavigation
@inject('store')
@observer
class Hamburger extends React.Component {
  constructor(props) {
    super(props)
    this.touchLog = R.touchLog.bind(this)
  }

  render() {
    const { navigation } = this.props
    return (
      <IconButton
        name='menu'
        size={ 40 }
        onPress={() => {
          this.touchLog('Hamburger')
          navigation.navigate('Menu')
        }} />
    )
  }
}

export default Hamburger
