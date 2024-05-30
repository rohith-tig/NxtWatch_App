import {Component} from 'react'
import {FaFire} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import NxtwatchContext from '../../context/NxtwatchContext'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import './trending.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    TrendingYtList: [],

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.TrendingApiCall()
  }

  TrendingApiCall = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        TrendingYtList: videoInfo,
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
        const {TrendingYtList} = this.state

        const mainPartBg = darkMode
          ? 'main-dark-light-bg'
          : 'main-part-light-bg'
        const videoParaColor = darkMode ? 'ib-hubs-dark' : 'ib-hubs-light'
        const titleColor = darkMode ? 'dark-title' : null
        return (
          <div className={`trending-main-part ${mainPartBg}`}>
            <ul className="trending-ul-divs">
              {TrendingYtList.map(video => {
                const distance = formatDistanceToNow(
                  new Date(video.publishedAt),
                )
                return (
                  <li key={video.id}>
                    <Link
                      to={`/videos/${video.id}`}
                      className="link-decoration"
                    >
                      <div className="trending-list-container">
                        <img
                          alt="thumbnail"
                          className="trending-thumbnail"
                          src={video.thumbnail}
                        />
                        <div className="trending-video-details">
                          <img
                            alt="profile"
                            className="trending-profile"
                            src={video.profileImg}
                          />
                          <div className="trending-video-flex-para">
                            <p className={`trending-title ${titleColor}`}>
                              {video.title}
                            </p>
                            <p
                              className={`trending-title name ${videoParaColor}`}
                            >
                              {video.name}
                            </p>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <p
                                className={`trending-title name ${videoParaColor}`}
                              >
                                {`${video.views} views`}
                              </p>
                              <p
                                className={`trending-title name li-st ${videoParaColor}`}
                              >
                                {distance}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
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
                    <FaFire className={`fire-light-css ${fireBg}`} />
                    <h1>Trending</h1>
                  </div>
                  {/* ul div */}
                  {this.renderNxtWatchPage()}
                </div>
              </div>
            </>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default Trending
