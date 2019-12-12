
const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex) {
  const topicsInsertions = knex('topics')
    .insert(topicData)
    .returning('*')
    // .then()
  const usersInsertions = knex('users')
    .insert(userData)
    .returning('*');
  
  
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return Promise.all([topicsInsertions, usersInsertions])
    })
    .then(() => {
      const formattedArticles = formatDates(articleData);
        return knex('articles')
          .insert(formattedArticles)
          .returning('*')

    })
    .then(articles => {
      
      
      const refObj = makeRefObj(articles);
      
      let formattedComments = formatDates(commentData);
      formattedComments = formatComments(formattedComments, refObj);
      

      return knex('comments')
        .insert(formattedComments)
        .returning('*')
        // .then(comments => {
        //   
        // })
    });
};
