import React from 'react'

const NxtWatchContext = React.createContext({
  darkMode: false,
  premiumDisplay: true,
  saveBtnClicked: false,
  savedVideos: [],
  closePremium: () => {},
  darkModeFunc: () => {},
  onClickSave: () => {},
  toggleSaveBtn: () => {},
})

export default NxtWatchContext
