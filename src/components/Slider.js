import React from 'react'
import { Slider } from 'react-native'

import R from 'res/R'


const CustomSlider = ({
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  ...restProps,
}) => (
  <Slider
    minimumTrackTintColor={ minimumTrackTintColor || '#E6E6E6' }
    maximumTrackTintColor={ maximumTrackTintColor || R.colors.white }
    thumbTintColor={ thumbTintColor || R.colors.primary }
    { ...restProps } />
)

export default CustomSlider
