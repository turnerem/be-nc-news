const connection = require('../db/connection')

// updateVotes = (votes) => {
//   return connection
//     .select('*').from()
// }

exports.fetchMaybeUpdateArticle = (article_id, votes = null) => {
  return connection
    .select('*').from('articles')
    .where('article_id', article_id)
    .modify(query => {
      if (votes) {
        query.update('votes', '+', votes)
        // article.votes += votes
      }
    })
    .then(([article]) => {
      // console.log('this is article in model', article)
      if (!article) return Promise.reject({ status: 404, msg: 'Not Found'})
      else {
        
        return connection
          .select('*').from('comments')
          .where('article_id', article_id)
          .then(comments => {
            article.comment_count = comments.length
            return article
          })
      }
    })
}

exports.addComment = (article_id, votes) => {
  return connection
    .select('*').from('articles')
    .where('article_id', article_id)
    .then(([article]) => {

    })
}