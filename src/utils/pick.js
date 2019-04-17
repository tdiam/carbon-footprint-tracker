import pick from 'object.pick'

export function picker(...keys) {
  return obj => pick(obj, keys)
}

export { pick }
