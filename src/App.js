import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import NxtwatchContext from './context/NxtwatchContext'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

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

  render() {
    const {darkMode, premiumDisplay} = this.state
    return (
      <NxtwatchContext.Provider
        value={{
          darkMode,
          premiumDisplay,
          closePremium: this.closePremium,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </NxtwatchContext.Provider>
    )
  }
}

export default App
