import React from 'react'
import { Link } from 'react-router-dom'

import Login from '../../containers/Login'
import Header from '../../components/Common/Header'
import './style.css'

class LoginPage extends React.Component {
  constructor() {
      super()
  }
  render() {
    return(
      <div className="LoginPageWrapper row">
        <div className="col-sm-6 offset-sm-3 col-xs-12">
          <Link to={'/home'} className="LoginPageHeader">
            <img src="https://i.ibb.co/GdxNNcF/Screen-Shot-2018-12-15-at-2-52-20-AM.png" />
          </Link>
          <div className="LoginPageBody">
            <Login />
          </div>
        </div>
        <div className="LoginPageFooter">
          <img src="https://i.ibb.co/dp5WFtJ/footer.png" />
        </div>
      </div>
    )
  }
}

export default LoginPage
