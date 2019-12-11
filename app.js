const express = require('express');
const app = express();
const apiRouter = require('./routers/mainRouter')

app.use(express.json())

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  
  if (err.code === '23503') {
    const badKey = err.detail.match(/Key \(([\w ]+)/)[1];
    console.log(badKey)
    err.status = 404;
    err.msg = `${badKey[0].toUpperCase() + badKey.slice(1)} Not Found`
  }
  res.status(err.status).send({ msg: err.msg })
})

module.exports = app;