const commentsRouter = require('express').Router();
const { patchComment, deleteComment } = require('../controllers/c-comments')
const { send405Error } = require('../errorHandling');

commentsRouter.route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)
  .all((req, res, next) => send405Error(req, res, next))
  


module.exports = commentsRouter;