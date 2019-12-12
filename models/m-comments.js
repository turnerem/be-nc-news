const connection = require('../db/connection');

exports.updateComment = (comment_id, inc_votes) => {
  // console.log('is id a number?', typeof parseInt(comment_id) === 'number')
  if (!inc_votes | !typeof parseInt(comment_id) === 'number') {
    return Promise.reject({status: 400, msg: 'Bad Request'})
  }
  return connection
    .select('*').from('comments')
    .where('comment_id', comment_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(([comment]) => {

      console.log(comment, 'comment in model')
      if (!comment) return Promise.reject({ status: 404, msg: 'Comment Not Found'})
      else return comment
    })
}

exports.removeComment = (comment_id) => {
  // console.log('reached model, id', comment_id)
  return connection('comments')
    .where('comment_id', comment_id)
    .del()
    .returning('*')
    .then(([comment]) => {
      if (!comment) return Promise.reject({ status: 404, msg: 'Comment Not Found'})
      else return comment
    })
    
}