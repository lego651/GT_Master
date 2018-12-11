import React from 'react'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import { connect } from 'react-redux'

import config from '../../config'
import { getUserData, reducerLoggedIn } from '../../actions/auth'
import UserAvatar from 'react-user-avatar'
import './style.css'

class ProfileNav extends React.Component {
  constructor() {
      super();
      this.state = { };
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    if(token != null && token.length > 0) {
      this.props.reducerLoggedIn()
      const local = {
        token: localStorage.getItem('token'),
        _id: localStorage.getItem('_id'),
        email: localStorage.getItem('email')
      }
      this.props.getUserData(local)
    }
  }
  render() {
    let content = !!this.props.auth.logged
                  ?
                  (
                    <div>
                      <UserAvatar
                          size="50"
                          name={this.props.auth.user.email.split("@")[0].substring(0,1).toUpperCase()} />
                    </div>
                  ) :
                  (
                      <div>
                          not logged in yet.
                      </div>
                  );
    return(
      <div className="Header">
        <div className="HeaderLeft">
          Logo
        </div>
        <div className="HeaderRight">
          {content}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = (dispatch) => ({
  getUserData: (data) => dispatch(getUserData(data)),
  reducerLoggedIn: () => dispatch(reducerLoggedIn())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileNav)
