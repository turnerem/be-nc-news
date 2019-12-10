const usersRouter = require('express').Router();
const { getUser } = require('../controllers/c-users')
// const { send404Error } = require('../errorHandling')

usersRouter.get('/:username', getUser)
  // .then(() => {
  //   console.log('reached users router')
  // })
  // .all(send404Error);

module.exports = usersRouter