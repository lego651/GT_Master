import jwt from 'jsonwebtoken'
import config from '../config'

const generateToken = (user) => {
  const timestamp = new Date().getTime();

  const token = jwt.sign({sub: user.id, iat: timestamp, exp: Math.floor(Date.now() / 1000) + (1 * 60),}, config.secret)

  return token
}

export default function(user) {
  return generateToken(user);
}
