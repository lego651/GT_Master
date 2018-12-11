import React from 'react'

import Profile from '../../containers/Profile'
import './style.css'

class ProfilePage extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <div className="row container ProfilePageWrapper">
        <div className="col-lg-2">
        </div>
        <div className="col-lg-8 col-12">
          <Profile />
        </div>
        <div className="col-lg-2">
        </div>
      </div>
    )
  }
}

export default ProfilePage
