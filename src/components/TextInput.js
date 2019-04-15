import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import R from 'res/R'


const CustomTextInput = ({ style, ...restProps }) => (
  <TextInput
    style={[styles.textInput, style]}
    { ...restProps } />
)

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: R.colors.white,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})

export default CustomTextInput
