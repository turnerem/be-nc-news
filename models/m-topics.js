const connection = require('../db/connection')

exports.fetchTopics = () => {
  
  return connection
    .select('*').from('topics')
    .then(topics => {
      return connection
        .select('topic', 'created_at').from('articles')
        .orderBy('created_at', 'asc')
        .then(topic_art_dates => {
          return { topics, topic_art_dates }
        })
      // for each topic:
      // join on articles and get dates
      // return topics
    })
};