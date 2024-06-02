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
import {json} from 'stream/consumers'

// Replace your code here
class App extends Component {
  state = {
    darkMode: false,
    premiumDisplay: true,

    savedVideosList: [],
  }

  onClickSave = video => {
    this.setState(prevState => {
      const isAlreadySaved = prevState.savedVideosList.find(
        savedVideo => savedVideo.id === video.id,
      )

      if (isAlreadySaved) {
        return {
          savedVideosList: prevState.savedVideosList.filter(
            savedVideo => savedVideo.id !== video.id,
          ),
        }
      }

      return {
        savedVideosList: [...prevState.savedVideosList, video],
      }
    })
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
    const {
      darkMode,
      premiumDisplay,
      savedVideosList,
      saveBtnClicked,
    } = this.state

    return (
      <NxtwatchContext.Provider
        value={{
          darkMode,
          premiumDisplay,
          saveBtnClicked,
          savedVideosList,
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
