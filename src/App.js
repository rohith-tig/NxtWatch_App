import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import NxtwatchContext from './context/NxtwatchContext'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'

// Replace your code here
class App extends Component {
  state = {
    darkMode: false,
    premiumDisplay: true,
    saveBtnClicked: false,
    savedVideosList: [],
  }

  onClickSave = video => {
    this.setState(prevState => ({
      saveBtnClicked: !prevState.saveBtnClicked,
    }))
    console.log(video)

    const {saveBtnClicked} = this.state
    if (saveBtnClicked) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, video],
      }))
      const {savedVideosList} = this.state
      console.log(savedVideosList)
    }
  }

  closePremium = () => {
    this.setState(prevState => ({
      premiumDisplay: !prevState.premiumDisplay,
    }))
  }

  darkModeFunc = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode,
    }))
    console.log('entered DarkMode')
  }

  render() {
    const {darkMode, premiumDisplay, saveBtnClicked} = this.state

    return (
      <NxtwatchContext.Provider
        value={{
          darkMode,
          premiumDisplay,
          saveBtnClicked,
          closePremium: this.closePremium,
          darkModeFunc: this.darkModeFunc,
          onClickSave: this.onClickSave,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
        </Switch>
      </NxtwatchContext.Provider>
    )
  }
}

export default App
