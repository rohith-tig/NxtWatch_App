import {Component} from 'react'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {RiPlayListAddLine} from 'react-icons/ri'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtwatchContext'
import './video.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoItem: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.videoApiCall()
  }

  videoApiCall = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`

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
      const videoInfo = {
        name: data.video_details.channel.name,
        profileImg: data.video_details.channel.profile_image_url,
        subscribers: data.video_details.channel.subscriber_count,
        id: data.video_details.id,
        publishedAt: new Date(data.video_details.published_at),
        description: data.video_details.description,
        thumbnail: data.video_details.thumbnail_url,
        videoUrl: data.video_details.video_url,
        title: data.video_details.title,
        views: data.video_details.view_count,
      }
      console.log(videoInfo)

      this.setState({
        videoItem: videoInfo,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        const {videoItem} = this.state
        const mainPartBg = darkMode
          ? 'main-dark-light-bg'
          : 'main-part-light-bg'
        const videoParaColor = darkMode ? 'ib-hubs-dark' : 'ib-hubs-light'
        const titleColor = darkMode ? 'dark-title' : null
        const likeBg = darkMode ? 'darkLike' : 'lightLike'

        const {
          videoUrl,
          title,
          views,
          publishedAt,
          name,
          profileImg,
          subscribers,
          description,
        } = videoItem
        const distance = formatDistanceToNow(new Date(publishedAt))
        const part = distance.split(' ')
        const num = part[1]
        console.log(num)

        return (
          <div className={`video-main-part ${mainPartBg}`}>
            <ReactPlayer width="100%" url={videoUrl} />
            <div className="sm-devices-padding">
              <h1 className={`video-title ${titleColor}`}>{title}</h1>
              <div className={`${videoParaColor} like-container`}>
                <div className="views">
                  <p className="views-padding">{`${views} views`}</p>
                  <p className="listStyleType">{`${num} years ago`}</p>
                </div>
                <div className="likes">
                  <button className={likeBg} type="button">
                    <BiLike className="like-font-size" />
                    Like
                  </button>
                  <button className={likeBg} type="button">
                    <BiDislike className="like-font-size" />
                    Dislike
                  </button>
                  <button className={likeBg} type="button">
                    <RiPlayListAddLine className="like-font-size" />
                    Save
                  </button>
                </div>
              </div>
            </div>
            <hr className="horizontal" />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <img alt="profile" className="video-profile" src={profileImg} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p className={`${titleColor}`} style={{marginBottom: '-12px'}}>
                  {name}
                </p>
                <p
                  className={`${videoParaColor}`}
                  style={{marginBottom: '-1px'}}
                >
                  {subscribers}
                </p>
              </div>
            </div>
            <p className={`video-title ${titleColor} sm-devices-padding`}>
              {description}
            </p>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderVideoPage = () => {
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
      <NxtWatchContext.Consumer>
        {value => {
          // eslint-disable-next-line
          const {darkMode} = value
          const HomeDarkBg = darkMode ? 'home-dark-bg' : 'home-light-bg'

          return (
            <>
              <div className={`${HomeDarkBg} video-item-arrangement`}>
                <Sidebar />
                <div className="video-nav-section">
                  <Navbar />
                  {this.renderVideoPage()}
                </div>
              </div>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
