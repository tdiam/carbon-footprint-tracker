import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import R from 'res/R'


const MenuButton = (props) => (
  <TouchableOpacity { ...props }>
    <MaterialIcons
      name='menu'
      size={ 40 }
      color={ R.colors.textColor } />
  </TouchableOpacity>
)

export default MenuButton
