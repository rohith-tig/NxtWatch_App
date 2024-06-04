import './index.css'
import {FaAlignJustify, FaMoon} from 'react-icons/fa'
import {IoIosLogOut} from 'react-icons/io'
import {IoSunnyOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import NxtwatchContext from '../../context/NxtwatchContext'

const Navbar = props => {
  const logoutFunc = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')

    localStorage.removeItem('savedVideosList')
  }
  return (
    <NxtwatchContext.Consumer>
      {value => {
        const {darkModeFunc, darkMode} = value

        const sidebarBg = darkMode ? 'sidebar-dark-bg' : 'sidebar-light-bg'
        const buttonsBg = darkMode ? 'button-dark-bg' : 'button-light-bg'
        const logoutBg = darkMode ? 'darkLogout' : 'logout'

        return (
          <>
            <div className={`navbar ${sidebarBg}`}>
              <button
                type="button"
                className={`sm-logout ${buttonsBg}`}
                onClick={darkModeFunc}
                aria-label="dark-mode-btn"
              >
                {darkMode ? (
                  <IoSunnyOutline className="sun" />
                ) : (
                  <FaMoon className="moon" />
                )}
              </button>

              <img
                className="profile-img"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                alt="profile"
              />
              <button
                onClick={logoutFunc}
                type="button"
                className={`${logoutBg}`}
              >
                Logout
              </button>
            </div>
            {/* SMALL DEVICES NAVBAR */}
            <div className={`sm-navbar ${sidebarBg}`}>
              <img
                className="nxtWatch-sm-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo"
              />
              <div>
                <button
                  type="button"
                  aria-label="theme-Changer"
                  className={`sm-logout ${buttonsBg}`}
                  onClick={darkModeFunc}
                >
                  {darkMode ? (
                    <IoSunnyOutline className="sunny" />
                  ) : (
                    <FaMoon className="moonny" />
                  )}
                </button>
                <FaAlignJustify className="sm-moon-light-theme" />
                <button
                  onClick={logoutFunc}
                  aria-label="logout"
                  type="button"
                  className={`sm-logout ${buttonsBg}`}
                >
                  <IoIosLogOut className={darkMode ? 'sunny' : 'moonny'} />
                </button>
              </div>
            </div>
          </>
        )
      }}
    </NxtwatchContext.Consumer>
  )
}

export default withRouter(Navbar)
