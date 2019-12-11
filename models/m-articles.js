const connection = require('../db/connection')

exports.fetchMaybeUpdateArticle = (article_id, votes = null) => {
  return connection
    .select('*').from('articles')
    .where('article_id', article_id)
    .then(([article]) => {
      // console.log('this is article in model', article)
      if (!article) return Promise.reject({ status: 404, msg: 'Not Found'})
      else {
        if (votes) {
          article.votes += votes
        }
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

// exports.updateArticle = (article_id, votes) => {
//   return connection
//     .select('*').from('articles')
//     .where('article_id', article_id)
//     .then(([article]) => {

//     })
// }