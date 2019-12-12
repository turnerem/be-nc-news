const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter')
const usersRouter = require('./usersRouter')
const articlesRouter = require('./articlesRouter')
const commentsRouter = require('./commentsRouter');

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter, () => {
    console.log('reached mainRouter')
})

// apiRouter.route('/*')
//   .all('/*', (req, res, next) => {
//     res.status(404).send('Route Not Found')
//   })

module.exports = apiRouter;