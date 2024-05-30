import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import NxtwatchContext from './context/NxtwatchContext'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import Gaming from './components/Gaming'
import Trending from './components/Trending'

// Replace your code here
class App extends Component {
  state = {
    darkMode: false,
    premiumDisplay: true,
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
    const {darkMode, premiumDisplay} = this.state

    return (
      <NxtwatchContext.Provider
        value={{
          darkMode,
          premiumDisplay,
          closePremium: this.closePremium,
          darkModeFunc: this.darkModeFunc,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/trending" component={Trending} />
        </Switch>
      </NxtwatchContext.Provider>
    )
  }
}

export default App
