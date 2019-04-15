import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import R from 'res/R'


const CloseButton = (props) => (
  <TouchableOpacity { ...props }>
    <MaterialIcons
      name='close'
      size={ 40 }
      color={ R.colors.white } />
  </TouchableOpacity>
)

export default CloseButton
