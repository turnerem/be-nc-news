const commentsRouter = require('express').Router();
const { patchComment, deleteComment } = require('../controllers/c-comments')

commentsRouter.route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)


module.exports = commentsRouter;