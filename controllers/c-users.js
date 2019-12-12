const { fetchUser } = require('../models/m-users')

exports.getUser = (req, res, next) => {
  console.log(req.params, 'PARAMS')
  fetchUser(req.params.username)
    .then(user => {
      res.status(200).send({ user })
    })
    .catch(err => next(err))
}