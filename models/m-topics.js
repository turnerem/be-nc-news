const connection = require('../db/connection')

exports.fetchTopics = () => {
  // console.log('reached model')
  return connection
    .select('*').from('topics')
    .then(topics => {
      return topics
    })
};