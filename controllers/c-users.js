const { fetchUser } = require('../models/m-users')

exports.getUser = (req, res, next) => {
  
  fetchUser(req.params.username)
    .then(user => {
      res.status(200).send({ user })
    })
    .catch(err => next(err))
}