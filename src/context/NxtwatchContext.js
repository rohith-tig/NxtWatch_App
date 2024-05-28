import React from 'react'

const NxtWatchContext = React.createContext({
  darkMode: false,
  premiumDisplay: true,
  closePremium: () => {},
  darkModeFunc: () => {},
})

export default NxtWatchContext
