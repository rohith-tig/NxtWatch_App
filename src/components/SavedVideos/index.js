import {RiPlayListAddLine} from 'react-icons/ri'
import {formatDistanceToNow} from 'date-fns'

import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import NxtwatchContext from '../../context/NxtwatchContext'

import './saved.css'

const SavedVideos = () => {
  const successView = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {savedVideosList} = value

        const {darkMode} = value

        const mainPartBg = darkMode
          ? 'main-dark-light-bg'
          : 'main-part-light-bg'
        const videoParaColor = darkMode ? 'ib-hubs-dark' : 'ib-hubs-light'
        const titleColor = darkMode ? 'dark-title' : null
        const trendingBg = darkMode ? 'trending-dark-css' : 'trending-light'
        const fireBg = darkMode ? 'fire-dark-bg' : null
        return (
          <>
            <div className={`trending-light-css ${trendingBg}`}>
              <RiPlayListAddLine className={`fire-light-css ${fireBg}`} />
              <h1>Saved Videos</h1>
            </div>
            <div className={`trending-main-part ${mainPartBg}`}>
              <ul className="trending-ul-divs">
                {savedVideosList.map(video => {
                  const distance = formatDistanceToNow(
                    new Date(video.publishedAt),
                  )
                  const part = distance.split(' ')
                  const num = part[1]
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
                                  {`${num} years ago`}
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
          </>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  const noSavedView = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {darkMode} = value
        const mainPartBg = darkMode
          ? 'main-dark-light-bg'
          : 'main-part-light-bg'
        const titleColor = darkMode ? 'dark-title' : null
        return (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center0',
                alignItems: 'center',
              }}
              className={`trending-main-part ${mainPartBg}`}
            >
              <img
                alt="no-saved"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                className="no-saved"
              />
              <h1 className={`${titleColor}`}>No Saved videos found</h1>
              <p className={`${titleColor}`}>
                You can save your videos while watching them
              </p>
            </div>
          </>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  return (
    <NxtwatchContext.Consumer>
      {value => {
        // eslint-disable-next-line
        const {darkMode, savedVideosList} = value
        const HomeDarkBg = darkMode ? 'home-dark-bg' : 'home-light-bg'

        return (
          <>
            <div className={`${HomeDarkBg} saved-item-arrangement`}>
              <Sidebar />
              <div className="saved-nav-section">
                <Navbar />

                {savedVideosList.length > 0 ? successView() : noSavedView()}
              </div>
            </div>
          </>
        )
      }}
    </NxtwatchContext.Consumer>
  )
}

export default SavedVideos
