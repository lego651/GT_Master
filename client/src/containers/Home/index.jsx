import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Section1 from './Subpage/Section1'
import Header from '../../components/Common/Header'
import { history } from '../../router/historyRouter'
import './style.css'

export default class Home extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token')
    if(token != null && token.length > 0) {
      history.push('/tasks')
    }
  }
  render() {
    return(
      <div className="HomeWrapper">
        <div className="Section1Wrapper">
          <Header />
          <Section1 />
        </div>
      </div>
    )
  }
}
