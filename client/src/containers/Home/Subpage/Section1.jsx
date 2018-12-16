import React from 'react'
import { Link } from 'react-router-dom'

export default class Section1 extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="d-none d-sm-block col-sm-3 Section1Left">
          <img src="https://i.ibb.co/QQh8t6t/landing-left.png" />
        </div>
        <div className="col-sm-6 col-xs-12 Section1Middle">
          <div className="Title"> Ephemeral to-do list </div>
          <div className="SubTitle"> Urge you to get things done before tasks disapper within 24 hours </div>

          <Link to={'/login'}
                className="Btn">
              Join In Now 
          </Link>
          <img src="https://i.ibb.co/kgK3prH/Screen-Shot-2018-12-15-at-12-11-43-AM.png" />
        </div>
        <div className="d-none d-sm-block col-sm-3 Section1Right">
          <img src="https://i.ibb.co/0JHG6fH/landing-right.png" />
        </div>
      </div>
    )
  }
}
