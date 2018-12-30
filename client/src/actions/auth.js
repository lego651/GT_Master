import axios from 'axios'

import constants from '../constants/auth'
import config from '../config'
import { history } from '../router/historyRouter'

export function signIn(data){
  return function(dispatch) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('_id', data._id)
    localStorage.setItem('email', data.email)
    localStorage.setItem('timestamp', Date.now())
    dispatch(reducerLoggedIn())
    dispatch(reducerSyncUserData(data))
    history.push('/tasks')
  }
}

export function reducerLoggedIn(){
  return function(dispatch){
    return dispatch({
      type: constants.LOGGED_IN
    })
  }
}

export function getUserData(data) {
  return function(dispatch) {
    if(data.token && data.token.length > 0) {
      return dispatch(reducerSyncUserData(data))
    } else {
      return dispatch(reducerSyncUserData(null))
    }
  }
}

export function reducerSyncUserData(data=null){
  return function(dispatch){
    return dispatch({
      type: constants.GET_USER_INFO,
      user: data
    })
  }
}

export function reducerLogout() {
  return function(dispatch) {
    return dispatch({
      type: constants.LOGGED_OUT
    })
  }
}

export function logout() {
  return function(dispatch) {
    const URL = config.serverUrl + '/signout'
    axios.get(URL)
      .then(response => {
        localStorage.removeItem('token')
        localStorage.removeItem('_id')
        localStorage.removeItem('email')
        dispatch(reducerLogout())
        history.push('/home')
      })
      .catch(result => {
        console.log(result)
      })
  }
}
