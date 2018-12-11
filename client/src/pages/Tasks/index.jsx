import React from 'react'

import AddTodo from '../../containers/AddTodo'
import ViewTodo from '../../containers/ViewTodo'
import ProfileNav from '../../containers/ProfileNav'

import './style.css'

export default class Tasks extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 TasksPageWrapper">
            <ProfileNav />
            <AddTodo />
            <ViewTodo />
          </div>
        </div>
      </div>
    )
  }
}
