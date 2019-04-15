import React from 'react'
import { withNavigation } from 'react-navigation'

import MenuButton from '../MenuButton'


const Hamburger = ({ navigation }) => (
  <MenuButton onPress={ () => navigation.navigate('Menu') } />
)

export default withNavigation(Hamburger)
