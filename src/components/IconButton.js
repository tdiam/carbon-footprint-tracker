import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import R from 'res/R'


const IconButton = ({ name, size, color, iconProps, ...restProps }) => (
  <TouchableOpacity { ...restProps }>
    <MaterialIcons
      name={ name }
      size={ size || 40 }
      color={ color || R.colors.textColor } 
      { ...iconProps } />
  </TouchableOpacity>
)

export default IconButton
