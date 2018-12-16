import User from '../models/user'
const authService = require('../services/AuthService')
import config from '../config'


export const authGoogle = function(req, res, next) {
  const email = req.user.email

  if(!email || email.length < 0){
    return res.status(400).send({error: 'invalid email'})
  }

  User.findOne({email: email})
      .exec(function(err, user){
        if(err){
          console.log(err)
        } else {
          if(user){
            return res.json(user)
          }
        }
      })
}

export const signout = function(req, res, next) {
  req.session.destroy(function(err) {
    if(err) {
      return res.status(400).send(err)
    }
    req.logout()
    res.send('logout success')
  })
}
