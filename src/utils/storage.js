import { AsyncStorage } from 'react-native'

import R from 'res/R'


export async function clearStorage() {
  const keys = await AsyncStorage.getAllKeys()
  await AsyncStorage.multiRemove(keys)
}

export async function exportStorage(identifier) {
  if (!identifier) return
  const keys = await AsyncStorage.getAllKeys()
  const stores = await AsyncStorage.multiGet(keys)
  let data = stores.map(([key, val]) => `"${key}":${val}`).join(',')
  data = '{' + data + '}'

  const dest = R.config.exportDestination + '/' + identifier
  try {
    await fetch(dest, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    })
  } catch(err) {
    console.error(
      `Exporting storage to "${dest}" failed, ` +
      `make sure that it is reachable.`, err
    )
  }
}
