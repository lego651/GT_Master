import React from 'react'

import './TodoItem.css'

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   width: 100
    // }
  }
  render() {
    // console.log(this.props.task)
    // console.log(Date.now())
    // const createdTime = new Date(this.props.task.addedTime)
    const now = new Date()
    const addedTime = this.props.task.addedTime
    const addedTimeStamp = (new Date(addedTime)).getTime()
    const nowTimeStamp = now.getTime()
    const microSecondsDiff = Math.abs(nowTimeStamp - addedTimeStamp)
    const secondsDiff = Math.floor(microSecondsDiff / (1000))
    // console.log(secondsDiff)
    // console.log(this.props.task.ifDone)
    // console.log(this.props.task.content)

    const timeBase = 1 * 24 * 60 * 60
    const percentage = secondsDiff / timeBase
    const percent = percentage <= 1 ? percentage : 1;

    const ifDone = this.props.task.ifDone

    let style = {
      width: (percent * 100 + '%'),
      textDecoration: ifDone ? 'line-through' : 'none'
    }
    return(
      <div className="todoWrapper" style={style}>
        <div className="left">
          <span className='completeIcon'
                onClick={(e)=>this._toggleTask(this.props.id)}>
            ✔️
          </span>
        </div>
        <div className="todoContent">
            {this.props.task.content}
        </div>
        <div className="right">
          <span className='deleteIcon'
                onClick={(e)=>this._deleteTask(this.props.id)}>
            🗑️
          </span>
        </div>
      </div>
    )
  }
  _deleteTask(id) {
    this.props.deleteTask(id)
  }
  _toggleTask(id) {
    this.props.toggleTask(id)
  }
}
