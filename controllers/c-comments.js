const { updateComment, removeComment } = require('../models/m-comments')

exports.patchComment = (req, res, next) => {
  // console.log(req.body)
  const { comment_id } = req.params
  const { inc_votes } = req.body
    console.log(comment_id, 'comment_id and ', inc_votes, 'the inc_votes')

  updateComment(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment })
    })
    .catch(err => next(err))
}

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params
  removeComment(comment_id)
    .then(comment => {
      // console.log('comment in controller', comment)
      res.status(200).send({ comment })
    })
    .catch(err => next(err))
}