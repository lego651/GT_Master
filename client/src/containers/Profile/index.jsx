import React from 'react'
import { connect } from 'react-redux'

import { getWeeklyCount } from '../../actions/task'
import { logout } from '../../actions/auth'
import { history } from '../../router/historyRouter'

import './style.css'

class Profile extends React.Component {

  componentDidMount() {
    this._loadData()
    console.log(this.props.weeklytotal)
    console.log(this.props.weeklydone)
  }
  render() {
    const weeklytotal = this.props.weeklytotal ? this.props.weeklytotal : 0;
    const weeklydone = this.props.weeklydone ? this.props.weeklydone : 0;
    const weeklyIncompleted = this.props.weeklytotal && this.props.weeklydone ? this.props.weeklytotal - this.props.weeklydone : 0
    return(
      <div className="ProfileWrapper">
        <div className="ProfileTitle">
          Your weekly overview
        </div>
        <div className="ProfileTotal">
          <h1 className="ProfileH"> {weeklytotal} </h1>
          <p className="ProfileP"> Total tasks </p>
        </div>
        <div className="ProfileCompleted">
          <h1 className="ProfileH"> {weeklydone} </h1>
          <p className="ProfileP"> Completed tasks </p>
        </div>
        <div className="ProfileIncompleted">
          <h1 className="ProfileH"> {weeklyIncompleted} </h1>
          <p className="ProfileP"> Incompleted tasks </p>
        </div>
        <div onClick = {() => this._redirect()}>
          <p className="ProfileGoBack">
            Go Back
          </p>
        </div>
        <div onClick = {() => this._logout()}>
          <p className="ProfileLogout">
            Sign Out
          </p>
        </div>
      </div>
    )
  }
  _redirect() {
    history.push('/tasks')
  }
  _loadData() {
    this.props.getWeeklyCount()
  }
  _logout() {
    this.props.logout()
  }
}


// export default Profile
const mapStateToProps = (state) => ({
  weeklytotal: state.task.weeklytotal,
  weeklydone: state.task.weeklydone
})
const mapDispatchToProps = (dispatch) => ({
  getWeeklyCount: () => dispatch(getWeeklyCount()),
  logout: () => dispatch(logout())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
