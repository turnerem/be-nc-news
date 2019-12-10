const connection = require('../db/connection')

exports.fetchArticle = (article_id) => {
  return connection
    .select('*').from('articles')
    .where('article_id', article_id)
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