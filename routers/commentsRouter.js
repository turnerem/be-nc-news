const commentsRouter = require('express').Router();
const { patchComment, deleteComment } = require('../controllers/c-comments')

commentsRouter.route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method Not Found'})
  })
  


module.exports = commentsRouter;