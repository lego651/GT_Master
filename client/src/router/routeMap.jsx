import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import HomePage from '../pages/Home'
import Tasks from '../pages/Tasks'
import About from '../pages/About'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import Test from '../pages/Test'

export const RouteMap = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          <Route exact path="/tasks" component={Tasks}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/profile" component={ProfilePage}/>
          <Route exact path="/test" component={Test}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
