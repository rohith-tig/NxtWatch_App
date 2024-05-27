import React from 'react'

const NxtWatchContext = React.createContext({
  darkMode: false,
  premiumDisplay: true,
  closePremium: () => {},
})

export default NxtWatchContext
