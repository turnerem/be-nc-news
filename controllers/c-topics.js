const { fetchTopics } = require('../models/m-topics')

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then(topics_res => {
      res.status(200).send({ topics_res })
    })
    .catch(err => next(err))
};