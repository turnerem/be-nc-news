const connection = require('../db/connection');

exports.updateComment = (comment_id, inc_votes) => {

  return connection
    .select('*').from('comments')
    .where('comment_id', comment_id)
    .modify(query => {
      if (inc_votes) query.increment('votes', inc_votes)
    })
    .returning('*')
    .then(([comment]) => {
      if (!comment) return Promise.reject({ status: 404, msg: 'Comment Not Found'})
      else return comment
    })
}

exports.removeComment = (comment_id) => {
  
  return connection('comments')
    .where('comment_id', comment_id)
    .del()
    .returning('*')
    .then(([comment]) => {
      if (!comment) return Promise.reject({ status: 404, msg: 'Comment Not Found'})
      else return comment
    })
    
}