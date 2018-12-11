import axios from 'axios'

import constants from '../constants/auth'
import config from '../config'

export function signIn(data){
  return function(dispatch) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('_id', data._id)
    localStorage.setItem('email', data.email)
    dispatch(reducerLoggedIn())
    dispatch(reducerSyncUserData(data))
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
