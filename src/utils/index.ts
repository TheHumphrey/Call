import { isPlainObject } from 'is-plain-object'

export const isMobile = (() => {
  if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
    return false
  }
  return /Mobile/.test(navigator.userAgent)
})()

export const getDeviceInfo = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()

  return {
    audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
    videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
    audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
    hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
    hasVideoInputDevices: devices.some(device => device.kind === 'videoinput'),
  }
}

export const isPermissionDenied = async (name: PermissionName) => {
  if (navigator.permissions) {
    try {
      const result = await navigator.permissions.query({ name })
      return result.state === 'denied'
    } catch {
      return false
    }
  } else {
    return false
  }
}

export const removeUndefineds = <T>(obj: T): T => {
  if (!isPlainObject(obj)) return obj

  const target: { [name: string]: any } = {}

  for (const key in obj) {
    const val = obj[key]
    if (typeof val !== 'undefined') {
      target[key] = removeUndefineds(val)
    }
  }

  return target as T
}