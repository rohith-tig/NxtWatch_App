import {Component} from 'react'

import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {IoHomeOutline} from 'react-icons/io5'
import {FaFire, FaAlignJustify, FaMoon, FaSearch} from 'react-icons/fa'
import {GiConsoleController} from 'react-icons/gi'
import {RiPlayListAddLine} from 'react-icons/ri'
import {format, formatDistanceToNow} from 'date-fns'
import {IoIosLogOut} from 'react-icons/io'
import NxtwatchContext from '../../context/NxtwatchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    HomeYtList: [],

    searched: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.HomeApiCall()
  }

  searchCapture = event => {
    this.setState({
      searched: event.target.value,
    })
  }

  HomeApiCall = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searched} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searched}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const videoInfo = data.videos.map(item => ({
        id: item.id,
        publishedAt: new Date(item.published_at),
        thumbnail: item.thumbnail_url,
        title: item.title,
        views: item.view_count,
        name: item.channel.name,
        profileImg: item.channel.profile_image_url,
      }))
      console.log(videoInfo)
      this.setState({
        HomeYtList: videoInfo,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  searchFunc = () => {
    this.HomeApiCall()
  }

  onClickHome = () => {
    this.HomeApiCall()
  }

  logoutFunc = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  omSuccesview = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {premiumDisplay, darkMode, closePremium} = value
        console.log(premiumDisplay)
      }}
    </NxtwatchContext.Consumer>
  )

  render() {
    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {HomeYtList, searched} = this.state

          const {id, publishedAt} = HomeYtList
          const {premiumDisplay, darkMode, closePremium} = value

          const isClicked = premiumDisplay ? 'flex-row' : 'show-none'

          return (
            <>
              <div className="item-arrangement">
                <div className="lg-sidebar">
                  <img
                    className="nxtWatch-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />

                  {/* ICONS */}

                  <div style={{marginTop: '50px'}}>
                    <div className="home">
                      <Link onClick={this.onClickHome} className="Links" to="/">
                        <IoHomeOutline className="icon" />
                        Home
                      </Link>
                    </div>
                    <div className="home">
                      <Link className="Links" to="/trending">
                        <FaFire className="icon" />
                        Trending
                      </Link>
                    </div>
                    <div className="home">
                      <Link className="Links" to="/gaming">
                        <GiConsoleController className="icon" />
                        Gaming
                      </Link>
                    </div>
                    <div className="home">
                      <Link className="Links" to="/saved-videos">
                        <RiPlayListAddLine className="icon" />
                        Saved videos
                      </Link>
                    </div>
                  </div>

                  {/* ICONS COMPLETED */}

                  <div className="contact">
                    <p>CONTACT US</p>
                    <div>
                      <img
                        className="facebook"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                        alt="facebook logo"
                      />
                      <img
                        className="facebook"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                        alt="twitter logo"
                      />
                      <img
                        className="facebook"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                        alt="linked in logo"
                      />
                    </div>
                    <p>Enjoy! Now to see your channels and recommendations!</p>
                  </div>
                </div>
                {/* SIDEBAR COMPLETED */}
                <div className="nav-section">
                  <div className="navbar">
                    <FaMoon className="moon" />
                    <img
                      className="profile-img"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                      alt="profile"
                    />
                    <button
                      onClick={this.logoutFunc}
                      type="button"
                      className="logout"
                    >
                      Logout
                    </button>
                  </div>
                  {/* SMALL DEVICES NAVBAR */}
                  <div className="sm-navbar">
                    <img
                      className="nxtWatch-sm-logo"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="website logo"
                    />
                    <div>
                      <button
                        type="button"
                        aria-label="theme-Changer"
                        className="sm-logout"
                      >
                        <FaMoon className="sm-moon-light-theme" />
                      </button>
                      <FaAlignJustify className="sm-moon-light-theme" />
                      <button
                        onClick={this.logoutFunc}
                        aria-label="logout"
                        type="button"
                        className="sm-logout"
                      >
                        <IoIosLogOut className="sm-moon-light-theme" />
                      </button>
                    </div>
                  </div>
                  {/* BANNER */}
                  <div className={`${isClicked}`}>
                    <div className="banner">
                      <img
                        height="40px"
                        width="150px"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="website logo"
                      />
                      <p>Buy Nxt Watch Premium prepaid plains with upi</p>
                      <button type="button" className="get">
                        GET IT NOW
                      </button>
                    </div>
                    <div className="x">
                      <button
                        onClick={closePremium}
                        className="btnn"
                        type="button"
                      >
                        X
                      </button>
                      {this.omSuccesview()}
                    </div>
                  </div>
                  {/* ul div */}
                  <div className="main-part">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '22px',
                        marginLeft: '30px',
                        marginBottom: '5px',
                      }}
                    >
                      <input
                        onChange={this.searchCapture}
                        placeholder="search"
                        value={searched}
                        className="input-css"
                        type="search"
                      />
                      <button
                        className="search-btn"
                        aria-label="search"
                        type="button"
                        onClick={this.searchFunc}
                      >
                        <FaSearch />
                      </button>
                    </div>
                    <ul className="ul-divs">
                      {HomeYtList.map(video => {
                        const dateString = format(
                          new Date(video.publishedAt),
                          'dd-MM-yyyy',
                        )
                        const distance = formatDistanceToNow(
                          new Date(video.publishedAt),
                        )
                        return (
                          <li className="list-container" key={video.id}>
                            <img
                              alt="thumbnail"
                              className="thumbnail"
                              src={video.thumbnail}
                            />
                            <div className="video-details">
                              <img
                                alt="profile"
                                className="profile"
                                src={video.profileImg}
                              />
                              <div className="video-flex-para">
                                <p className="title">{video.title}</p>
                                <p className="title name">{video.name}</p>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <p className="title name">{`${video.views} views`}</p>
                                  <p className="title name li-st">{distance}</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default Home
