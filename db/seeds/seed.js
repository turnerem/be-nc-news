
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
      
      // console.log(articles[0], 'ARTICLE FORMATTED');
      const refObj = makeRefObj(articles);
      // console.log(commentData[0], 'COMMENT NOT FORMATTED');
      let formattedComments = formatDates(commentData);
      formattedComments = formatComments(formattedComments, refObj);
      // console.log(formattedComments[0], 'COMMENT FORMATTED 1');

      return knex('comments')
        .insert(formattedComments)
        .returning('*')
        // .then(comments => {
        //   console.log(comments[0], 'COMMENT FORMATTED 2');
        // })
    });
};
