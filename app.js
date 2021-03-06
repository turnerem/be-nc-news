const express = require('express');
const app = express();
const apiRouter = require('./routers/mainRouter')
const cors = require('cors')

app.use(cors())
app.use(express.json())
  
app.use('/api', apiRouter)


app.all('/*', (req, res, next) => {
  
    res.status(404).send({ msg: 'Route Not Found' })
  })


app.use((err, req, res, next) => {
  

  const psqlErrs = {
    '22P02': { status: 400, msg: 'Bad Request'},
    '23502': { status : 400, msg: 'Bad request'},
    '42703': { status: 400, msg: 'Invalid Query'}
  }
  if (err.code === '23503') {
    const badKey = err.detail.match(/Key \(([\w ]+)/)[1];
    const messageKey = badKey[0].toUpperCase() + badKey.slice(1);
    const status = 404;
    const msg = `${messageKey} Not Found`
    res.status(status).send({ msg })

  } else if (psqlErrs.hasOwnProperty(err.code)) {
    const { status, msg } = psqlErrs[err.code]
    res.status(status).send({ msg })
  }
  res.status(err.status).send({ msg: err.msg })
})

module.exports = app;