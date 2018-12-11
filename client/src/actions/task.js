import axios from 'axios'

import constants from '../constants/task'
import config from '../config.js'

// POST add new task
export function addTask(taskContent) {
  return function(dispatch){
    const URL = config.serverUrl + '/tasks'
    axios.post(URL, {content: taskContent},{
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => {
        return dispatch({
          type: constants.TASK_ADD,
          content: response.data.content,
          id: response.data.id,
          addedTime: response.data.addedTime
        })
      })
      .catch(result => {
        console.log(result)
      })
  }
}

// POST delete task
export function deleteTask(id){
  console.log('data in action is:' + id)
  return function(dispatch) {
    const URL = config.serverUrl + '/delete'
    axios.post(URL, {task_id: id}, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        return dispatch({
          type: constants.TASK_DELETE,
          id: id
        })
      })
      .catch(result => {
        console.log(result)
      })
  }
}

// GET user tasks list
export function getUserTasks(token=null) {
    return function(dispatch) {
      if(token && token.length > 0) {
        const URL = config.serverUrl + '/latest'
        axios.get(URL, {headers: {authorization: token} })
          .then(response => {
            return dispatch(reducerSyncUserTasks(response.data.tasksList))
          })
          .catch(response => {
            console.log('getUserTasks actions error.')
          })
      } else {
        return dispatch(reducerSyncUserTasks(null))
      }
    }
}

// Sync tasks list data to reducer
export function reducerSyncUserTasks(data=null) {
  return function(dispatch) {
    return dispatch({
      type: constants.GET_USER_TASKS,
      data: data
    })
  }
}

// POST toggle task
export function toggleTask(id) {
  // console.log('data in action is:' + id)
  return function(dispatch) {
    const URL = config.serverUrl + '/toggletask'
    axios.post(URL, {task_id: id}, {
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => {
        // console.log(response.data)
        return dispatch({
          type: constants.TASK_TOGGLE,
          id: id,
          ifDone: response.data.ifDone
        })
      })
      .catch(result => {
        console.log(result)
      })
  }
}

// GET user latest weekly tasks
export function getWeeklyCount() {
  // console.log('getWeeklyCount is called')
  return function(dispatch) {
    const URL = config.serverUrl + '/weekly'
    axios.get(URL, {
      headers: {
          'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => {
        const totalCount = response.data
        const doneURL = config.serverUrl + '/weeklydone'
        axios.get(doneURL, {
          headers: {
              'Authorization': localStorage.getItem('token')
          }
        })
          .then(response => {
            // console.log('GET request is called.')
            console.log(totalCount)
            console.log(response.data)
            return dispatch({
              type: constants.TASK_PROFILE,
              totalCount: totalCount,
              doneCount: response.data
            })
          })
          .catch(result => {
            console.log(result)
          })
      })
      .catch(result => {
        console.log(result)
      })
  }
}
