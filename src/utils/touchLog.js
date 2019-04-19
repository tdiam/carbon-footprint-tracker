const lastRootTouches = []

export default function touchLog(...args) {
  const now = Date.now()
  if (args.length === 1 && args[0] === '@Root') {
    lastRootTouches.push(now)
  } else {
    let recentRootTouch = lastRootTouches.findIndex(t => now - t < 400)
    if (recentRootTouch >= 0) {
      lastRootTouches.splice(recentRootTouch)
    }
    if (lastRootTouches.length) {
      console.log('touchLog:', lastRootTouches.map(_ => '@Other'), lastRootTouches[0])
      lastRootTouches.splice(0)
    }
    console.log('touchLog:', args, Date.now())
  }
}
