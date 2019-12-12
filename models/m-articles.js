const connection = require('../db/connection')
// const { checkExistenceInOtherTable } = require('../db/utils/utils')

// XX function not working when required in
const checkExistenceInOtherTable = (sqlColName, msgColName, sqlVal, sqlTable) => {
  return connection  
          .select(sqlColName).from(sqlTable)
          .where(sqlColName, sqlVal)
          .then(chkData => {
            
            if (!chkData.length) {
              return Promise.reject({ 
                status: 404, 
                msg: `${msgColName} Not Found`})
            }
            else return []
          })
}

exports.fetchArticles = (sort_by, order, author, topic) => {
  // const sqlColNames = []
  return connection
    .select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes').from('articles')
    .count({ comment_count: 'comments.comment_id'})
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where('articles.author', author)
      if (topic) query.where('articles.topic', topic)
    })
    .then(articles => {
      console.log(articles, 'articles in mod')
      if (!articles.length) {
        
        if (author) {

          return checkExistenceInOtherTable('username', 'Author', author, 'users')

        } else if (topic) {
          
          return checkExistenceInOtherTable('slug', 'Topic', topic, 'topics')

          }
      } 
      

      return articles
    })
}

// XX rewrite with subqueries
exports.fetchArticle = (article_id) => {
  return connection  
    .select('articles.*').from('articles')
    .where('articles.article_id', article_id)
    .count({ comment_count: 'comments.comment_id'})
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(([article]) => {
      return (!article) ? Promise.reject({ status: 404, msg: "Article Not Found"}) : article
    })
}

exports.updateArticle = (article_id, votes) => {
  // if (!votes) return Promise.reject({ status: 100, msg: 'No Change'})
  return connection  
    .select('*').from('articles')
    .where('article_id', article_id)
    .modify(query => {
      if (votes) query.increment('votes', votes)
    })
    .returning('*')
    .then(([article]) => {
      
      return article
    })
}




exports.addComment = (article_id, comment) => {
  const {username, body} = comment;
  
  if (!username || !body) return Promise.reject({ status: 400, msg: 'Bad Request'})
  const formattedComment = {author: username, body, article_id}
  

  return connection
    .returning('*').from('comments')
    .insert(formattedComment)
    .then(([comment]) => {
      return comment
    })
}





exports.fetchComments = (article_id, sort_by, order) => {
  return connection
    .select('comment_id', 'votes', 'created_at', 'author', 'body').from('comments')
    .where('article_id', article_id)
    .orderBy(sort_by, order)
    .then(comments => {
      if (!comments.length) {
        
        return checkExistenceInOtherTable('article_id', 'Article', article_id, 'articles')
      }
      
      return comments
    })
}