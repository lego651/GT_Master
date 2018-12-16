import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Home from '../../containers/Home'
import './style.css'

class HomePage extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <div className="row HomePageWrapper">
        <Home />
      </div>
    )
  }
}

export default HomePage
