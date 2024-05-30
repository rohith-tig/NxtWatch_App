import {Component} from 'react'

import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
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
    const url = `https://apis.ccbp.in/videos/all/?search=${searched}`
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
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchFunc = () => {
    this.HomeApiCall()
  }

  retryFunc = () => {
    this.HomeApiCall()
  }

  renderSuccessView = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {darkMode} = value
        const {HomeYtList, searched} = this.state

        const zeroListLength = HomeYtList.length === 0
        const mainPartBg = darkMode
          ? 'main-dark-light-bg'
          : 'main-part-light-bg'
        const videoParaColor = darkMode ? 'ib-hubs-dark' : 'ib-hubs-light'
        const titleColor = darkMode ? 'dark-title' : null
        return (
          <div className={`main-part ${mainPartBg}`}>
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
                className={
                  darkMode ? 'input-css dark-input' : 'input-css light-input'
                }
                type="search"
              />
              <button
                className={
                  darkMode ? 'search-btn dark-search-button' : 'search-btn'
                }
                aria-label="search"
                type="button"
                onClick={this.searchFunc}
              >
                <FaSearch />
              </button>
            </div>

            {zeroListLength ? (
              <div className="random-search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt="no-search-results-img"
                  className="no-search-img"
                />
                <h1>No Search results found</h1>
                <p>Try different Key words or remove search filter</p>
                <button type="button" onClick={this.retryFunc}>
                  Retry
                </button>
              </div>
            ) : (
              <ul className="ul-divs">
                {HomeYtList.map(video => {
                  const distance = formatDistanceToNow(
                    new Date(video.publishedAt),
                  )
                  return (
                    <li className="list-container" key={video.id}>
                      <Link
                        to={`/videos/${video.id}`}
                        className="link-decoration"
                      >
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
                            <p className={`title ${titleColor}`}>
                              {video.title}
                            </p>
                            <p className={`title name ${videoParaColor}`}>
                              {video.name}
                            </p>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <p
                                className={`title name ${videoParaColor}`}
                              >{`${video.views} views`}</p>
                              <p
                                className={`title name li-st ${videoParaColor}`}
                              >
                                {distance}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
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
          const {HomeYtList} = this.state
          // eslint-disable-next-line
          const {id, publishedAt} = HomeYtList

          const {premiumDisplay, darkMode, closePremium} = value

          const isClicked = premiumDisplay ? 'flex-row' : 'show-none'
          const HomeDarkBg = darkMode ? 'home-dark-bg' : 'home-light-bg'

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

export default Home
