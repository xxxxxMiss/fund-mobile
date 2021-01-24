import React from 'react'

export let defaultConfig = {
  disabledHoldShare: false,
  // more config
}

export const changeConfig = config => {
  defaultConfig = { ...defaultConfig, ...config }
}

export default React.createContext(defaultConfig)
