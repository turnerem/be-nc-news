const usersRouter = require('express').Router();
const { getUser } = require('../controllers/c-users')
const { send405Error } = require('../errorHandling')

usersRouter.route('/:username')
  .get(getUser)
  .all(send405Error)


module.exports = usersRouter