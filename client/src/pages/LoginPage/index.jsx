import React from 'react'

import Login from '../../containers/Login'

class LoginPage extends React.Component {
  constructor() {
      super()
  }
  render() {
    return(
      <div className="LoginPageWrapper">
        <Login />
      </div>
    )
  }
}

export default LoginPage
