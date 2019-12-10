const express = require('express');
const app = express();
const apiRouter = require('./routers/mainRouter')

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status).send({ msg: err.msg })
})

module.exports = app;