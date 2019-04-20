const lastRootTouches = []

const consoleLogger = ({ timestamp, data }) => {
  console.log(`touchLog: [${timestamp}]`, ...data)
}

let WARNED_NO_INJECTED_STORE = false
const warnNoInjectedStore = () => {
  if (WARNED_NO_INJECTED_STORE) return
  consoleLogger('is not bound to a component with injected store!')
  WARNED_NO_INJECTED_STORE = true
}


export default function touchLog(...data) {
  if (!this.props || !this.props.store) {
    warnNoInjectedStore()
    return
  }
  if (!this.props.store.settingsStore.settings.logTouchEvents) {
    // Skip logging if setting is turned off
    return
  }

  let logger = async ({ timestamp, data }) => {
    consoleLogger({ timestamp, data })
    await this.props.store.experimentStore.sync()
    await this.props.store.experimentStore.addTouchLog({ timestamp, data })
  }

  const now = Date.now()
  if (data.length === 1 && data[0] === '@Root') {
    lastRootTouches.push(now)
  } else {
    let recentRootTouch = lastRootTouches.findIndex(t => now - t < 400)
    if (recentRootTouch >= 0) {
      lastRootTouches.splice(recentRootTouch)
    }
    if (lastRootTouches.length) {
      logger({ timestamp: lastRootTouches[0], data: lastRootTouches.map(_ => '@Other') })
      lastRootTouches.splice(0)
    }
    logger({ timestamp: now, data })
  }
}
