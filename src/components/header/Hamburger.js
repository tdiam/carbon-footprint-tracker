import React from 'react'
import { withNavigation } from 'react-navigation'

import R from 'res/R'
import IconButton from '../IconButton'


const Hamburger = ({ navigation }) => (
  <IconButton
    name='menu'
    size={ 40 }
    onPress={ () => navigation.navigate('Menu') } />
)

export default withNavigation(Hamburger)
