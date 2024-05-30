import {Component} from 'react'

import Cookies from 'js-cookie'

import {GiConsoleController} from 'react-icons/gi'
import Loader from 'react-loader-spinner'
import NxtwatchContext from '../../context/NxtwatchContext'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    GamingYtList: [],

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.GamingApiCall()
  }

  GamingApiCall = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
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

        thumbnail: item.thumbnail_url,
        title: item.title,
        views: item.view_count,
      }))
      console.log(videoInfo)
      this.setState({
        GamingYtList: videoInfo,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {darkMode} = value
        const {GamingYtList} = this.state

        const mainPartBg = darkMode
          ? 'main-dark-light-bg'
          : 'main-part-light-bg'
        const videoParaColor = darkMode ? 'ib-hubs-dark' : 'ib-hubs-light'
        const titleColor = darkMode ? 'dark-title' : null

        return (
          <div className={`main-part ${mainPartBg}`}>
            <ul className="gaming-ul-divs">
              {GamingYtList.map(video => (
                <li className="gaming-list-container" key={video.id}>
                  <img
                    alt="thumbnail"
                    className="gaming-thumbnail"
                    src={video.thumbnail}
                  />
                  <div className="video-details">
                    <div className="gaming-video-flex-para">
                      <p className={`title ${titleColor}`}>{video.title}</p>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <p
                          className={`title name ${videoParaColor}`}
                        >{`${video.views} views`}</p>
                        <p className={`title name ${videoParaColor}`}>
                          Worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <>
      <div className="main-part random-search">
        <img
          className="no-search-img"
          alt="failure"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        />
        <h1>Oops!Something Went Wrong</h1>
        <p>
          We are having some trouble to complete your request.Please try again
        </p>
        <button type="button">Retry</button>
      </div>
    </>
  )

  renderNxtWatchPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtwatchContext.Consumer>
        {value => {
          // eslint-disable-next-line

          const {premiumDisplay, darkMode, closePremium} = value

          const isClicked = premiumDisplay ? 'flex-row' : 'show-none'
          const HomeDarkBg = darkMode ? 'home-dark-bg' : 'home-light-bg'
          const trendingBg = darkMode ? 'trending-dark-css' : 'trending-light'
          const fireBg = darkMode ? 'fire-dark-bg' : null
          return (
            <>
              <div className={`item-arrangement ${HomeDarkBg}`}>
                <Sidebar />

                <div className="nav-section">
                  <Navbar />

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
                    </div>
                  </div>
                  <div className={`trending-light-css ${trendingBg}`}>
                    <GiConsoleController
                      className={`fire-light-css ${fireBg}`}
                    />
                    <h1>Gaming</h1>
                  </div>
                  {this.renderNxtWatchPage()}

                  {/* ul div */}
                </div>
              </div>
            </>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default Gaming
