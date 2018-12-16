import React from 'react'
import { connect } from 'react-redux'

import { history } from '../router/historyRouter'
import { getUserData, reducerLoggedIn } from '../actions/auth'

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (!token || token == null) {
      history.push("/login")
    }
  }

  render() {
    const token = localStorage.getItem('token')
    if (token) {
      return this.props.children
    } else {
      return null
    }
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
)(EnsureLoggedInContainer)
