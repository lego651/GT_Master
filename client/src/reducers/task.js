import constants from '../constants/task'

var initialState = {
  tasks: [],
  done: [],
  totalCount: 0,
  doneCount: 0
}

const removeById = (array, id) => {
  return array.filter((item) => item.id !== id)
}
const updateIfDone = (array, id, newIfDone) => {
  const payload = {ifDone: newIfDone}
  return array.map((item) => {
    if(item.id == id) {
      return {...item, ...payload}
    }
    return item
  })
}

export default(state = initialState, action) => {
  switch(action.type) {
    case constants.GET_USER_TASKS:
      return {
        tasks: [...state.tasks, ...action.data]
      }
    case constants.GET_USER_DONE:
      return {
        done: [...state.done, ...action.data]
      }
    case constants.TASK_ADD:
      return {
        ...state,
        tasks: [...state.tasks, {
          content: action.content,
          id: action.id,
          addedTime: action.addedTime
        }]
      }
    case constants.TASK_DELETE:
      return {
        ...state,
        tasks: removeById(state.tasks, action.id)
      }
    case constants.TASK_TOGGLE:
      return {
        ...state,
        tasks: updateIfDone(state.tasks, action.id, action.ifDone)
      }
    case constants.TASK_PROFILE:
      return {
        ...state,
        ...action.totalCount,
        ...action.doneCount
      }
    default:
      return state;
  }
}
