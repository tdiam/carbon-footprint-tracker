import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'


const TouchLogSerializer = ({ timestamp, data }) => ({
  timestamp,
  data: data.toJS(),
})

class ExperimentStore {
  constructor(root) {
    this.rootStore = root
  }

  @observable touchLogs = []
  @observable channel = ''
  @observable isLoading = true
  @observable _hasSyncedWithStorage = false

  @action
  async setChannel(channel) {
    if (this.channel === channel) return

    this.channel = channel
    if (this.channel) {
      this._hasSyncedWithStorage = false
      await this.sync()
    }
  }

  @action
  async sync() {
    if (this._hasSyncedWithStorage) return
    if (this.channel === '') {
      console.error('Set the channel before trying to sync with ExperimentStore')
      return
    }

    let touchLogs = []

    try {
      touchLogs = await AsyncStorage.getItem(`@Experiment:${this.channel}:TouchLogs`)
      touchLogs = !touchLogs ? [] : JSON.parse(touchLogs)
      if (touchLogs.constructor !== Array) {
        throw new Error(`Stored touchLogs for channel ${this.channel} is not an array`)
      }
    } catch(err) {
      console.error(err)
      touchLogs = []
    }

    this.touchLogs = touchLogs
    this._hasSyncedWithStorage = true
  }

  @action
  async addTouchLog({ timestamp, data }) {
    if (this.channel === '') {
      console.log('addTouchLog will be ignored since channel is not set')
      return
    }
    this.touchLogs.push({ timestamp, data })
    await this.save()
  }

  @action
  async deleteTouchLogs() {
    this.touchLogs = []
    await this.save()
  }

  printTouchLogsToConsole() {
    if (this.channel === '') return
    console.log(`Touch logs for channel ${this.channel}`)
    let output = ''
    this.touchLogs.forEach(({ timestamp, data }) => {
      let dataPrintable = data.map(JSON.stringify).join(' ')
      output += `[${timestamp}] ${dataPrintable}\n`
    })
    console.log(output)
  }

  @action
  async save() {
    if (this.channel === '') {
      throw new Error('Set the channel before trying to save in ExperimentStore')
    }
    try {
      const json = JSON.stringify(this.touchLogs.map(TouchLogSerializer))
      await AsyncStorage.setItem(`@Experiment:${this.channel}:TouchLogs`, json)
      return true
    } catch(err) {
      console.error(err)
      return false
    }
  }
}

export { ExperimentStore, TouchLogSerializer }
