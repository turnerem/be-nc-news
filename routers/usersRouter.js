const usersRouter = require('express').Router();
const { getUser } = require('../controllers/c-users')
// const { send404Error } = require('../errorHandling')

usersRouter.route('/:username')
  .get(getUser)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method Not Found'})
  })


module.exports = usersRouter