/**
 * https://stackoverflow.com/a/13635455/11114199
 */
export default function round(value, min, step) {
  const rounded = min + step * Math.round((value - min) / step)
  const smoothed = Math.round(rounded * 1e6) / 1e6
  return smoothed
}
