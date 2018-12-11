import Task from '../models/task'
import User from '../models/user'

// POST add task
export const addTask = function(req, res, next) {
  const user = req.user

  if(!user) {
    return res.status(400).send({error: 'invalid user.'})
  }

  const content = req.body.content
  const task = new Task({
      _user: user._id,
      content: content
  })

  task.save(function(err, result) {
    if(err) {
      return console.log(err)
    }
    // return res.json({'task': 'added'})
    return res.json({
      'content': content,
      'id': result._id,
      'addedTime': result.addedTime
    })
  })
}

// POST delete task
export const deleteTask = function(req, res, next) {
  const task_id = req.body.task_id
  if(!task_id || task_id.length < 0) {
    return res.status(400).send({error: 'invalid task.'})
  }

  Task.remove({_id: task_id}, function(err) {
    if(err) {
      console.log(err)
    }
    return res.json({"task": "removed"})
  })
}

// Search Task List
export const searchTask = function(req, res, next) {
  const user = req.user

  if(!user) {
    return res.status(400).send({error: 'invalid user.'})
  }

  Task.find({_user: user._id})
      .exec(function(err, results){
        if(err) {
          console.log(err)
        }
        if(results) {
          const tasks = results.map((item) => {
            return {
              content: item.content,
              id: item._id,
              addedTime: item.addedTime,
              ifDone: item.ifDone
            }
          })
          return res.json({
            'tasksList': tasks
          })
        }
      }) // -- Task.find.exec --
}

// Search Latest List
export const searchLatest = function(req, res, next) {
  const user = req.user

  if(!user) {
    return res.status(400).send({error: 'invalid user.'})
  }

  Task.find(
    {_user: user._id,
     addedTime: {$gt:new Date(Date.now() - 1 * 60 * 60 * 1000)}
    }
  )
      .exec(function(err, results){
        if(err) {
          console.log(err)
        }
        if(results) {
          const tasks = results.map((item) => {
            return {
              content: item.content,
              id: item._id,
              addedTime: item.addedTime,
              ifDone: item.ifDone
            }
          })
          return res.json({
            'tasksList': tasks
          })
        }
      }) // -- Task.find.exec --
}

// POST toggle task
export const toggleTask = function(req, res, next) {
  const task_id = req.body.task_id
  if(!task_id || task_id.length < 0) {
    return res.status(400).send({error: 'invalid task.'});
  }

  Task.findOne({_id: task_id})
    .exec(function(err, task) {
      if(err) {
        console.log(err)
      }
      Task.update({_id: task_id},
        {
          $set: {
            ifDone: !task.ifDone
          }
        }, function(err) {
          if(err) {
            console.log(err)
          }
          return res.json({ifDone: !task.ifDone})
        }
      )
    }) // findOne.exec
}

// GET weekly total tasks count
export const weeklyCount = function(req, res, next) {
  const user = req.user

  if(!user) {
    return res.status(400).send({error: 'invalid user.'})
  }

  Task.find(
    {_user: user._id,
     addedTime: {$gt:new Date(Date.now() - 7 * 60 * 60 * 1000)}
    }
  )
      .count()
      .exec(function(err, results){
        if(err) {
          console.log(err)
        }
        // console.log(results)
        if(results) {
          return res.json({
            'weeklytotal': results
          })
        }
      }) // -- Task.find.exec --
}
// GET weekly completed tasks count
export const weeklyCompletedCount = function(req, res, next) {
  const user = req.user

  if(!user) {
    return res.status(400).send({error: 'invalid user.'})
  }

  Task.find(
    {_user: user._id,
     ifDone: true,
     addedTime: {$gt:new Date(Date.now() - 7 * 60 * 60 * 1000)}
    }
  )
      .count()
      .exec(function(err, results){
        if(err) {
          console.log(err)
        }
        // console.log(results)
        if(results) {
          return res.json({
            'weeklydone': results
          })
        }
      }) // -- Task.find.exec --
}
