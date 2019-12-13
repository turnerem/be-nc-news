const { updateComment, removeComment } = require('../models/m-comments')

exports.patchComment = (req, res, next) => {
  
  const { comment_id } = req.params
  const { inc_votes } = req.body
  
  updateComment(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment })
    })
    .catch(err => next(err))
}

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params
  removeComment(comment_id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => next(err))
}