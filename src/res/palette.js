import { Constants } from 'expo'

import colors from './colors'
import fonts from './fonts'


const marginPaddingStyles = (() => {
  const sizes = [0, 8, 16, 24, 32, 40]
  const palettes = {
    'mt': 'marginTop',
    'mr': 'marginRight',
    'mb': 'marginBottom',
    'ml': 'marginLeft',
    'pt': 'paddingTop',
    'pr': 'paddingRight',
    'pb': 'paddingBottom',
    'pl': 'paddingLeft',
  }

  let styles = {}
  for(const [pid, palette] of Object.entries(palettes)) {
    sizes.forEach((size, index) => {
      styles[`${pid}${index}`] = { [palette]: size }
    })
  }

  return styles
})()

/**
 * Common styles.
 */
export default {
  header: {
    marginVertical: 6,
  },
  headerContainers: {
    marginHorizontal: 24,
  },
  headerTitle: {
    fontFamily: fonts.title,
    fontSize: 28,
    fontWeight: 'normal',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  screenContent: {
    paddingHorizontal: 24,
    marginTop: Constants.statusBarHeight + 80,
  },
  screenContentContainer: {
    paddingBottom: 100,
  },
  screenSection: {
    fontFamily: fonts.title,
    fontSize: 24,
    fontWeight: 'normal',
    marginVertical: 8,
  },
  screenSectionMargined: {
    marginTop: 36,
  },
  floating: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  disabledButton: {
    opacity: 0.2,
  },
  bold: {
    fontWeight: 'bold',
  },
  w100: {
    width: '100%',
  },
  ...marginPaddingStyles,
}
