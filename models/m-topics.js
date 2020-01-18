const connection = require('../db/connection')

exports.fetchTopics = () => {
  
  return connection
    .select('*').from('topics')
    .then(topics => {
      // for each topic:
      // join on articles and get dates
      return topics
    })
};