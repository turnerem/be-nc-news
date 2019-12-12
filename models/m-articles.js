const connection = require('../db/connection')

exports.fetchArticles = (sort_by, order, author, topic) => {
  // console.log('reached model')
  return connection
    .select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes').from('articles')
    .count({ comment_count: 'comments.comment_id'})
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where('articles.author', author)
    })
    .modify(query => {
      // console.log('we get here')
      if (topic) query.where('articles.topic', topic)
    })
    .then(articles => {
      if (!articles.length) {
        // console.log('no articles in the MODEL', articles)
        if (author) {
          return connection  
          .select('username').from('users')
          .where('username', author)
          .then(author => {
            // console.log('this is the AUTHOR', author)
            if (!author.length) return Promise.reject({ status: 404, msg: 'Author Not Found'})
            else return articles
          })
        } else if (topic) {
          // console.log('checking topic')
          return connection  
            .select('slug').from('topics')
            .where('slug', topic)
            .then(topic => {
              // console.log('this is the TOPIC', topic)
              if (!topic.length) return Promise.reject({ status: 404, msg: 'Topic Not Found'})
              else return articles
            })
          }
      } 
      // console.log('get back out')

      return articles
    })
}

// exports.fetchArticleMaybeUpdate = (article_id, votes = null) => {
//   return connection
//     .select('articles.*').from('articles')
//     .where('article_id', article_id)
//     .leftJoin('comments', 'articles.article_id', 'comments.article_id')
//     .count({ comment_count: 'article_id'})
//     .groupBy('articles.title')
//     .modify(query => {
//       if (votes) {
//         query.increment('votes', votes);
//       }
//     })
//     .returning('*')
//     .then(([article]) => {
//       console.log(article, 'THIS ARTICLE MODEL')
//       // console.log('this is article in model', article)
//       if (!article) return Promise.reject({ status: 404, msg: 'Not Found'})
//       else {
//         return article
//       }
//     })
// }


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
  return connection  
    .select('*').from('articles')
    .where('article_id', article_id)
    .increment('votes', votes)
    .returning('*')
    .then(([article]) => {
      // console.log(article)
      return article
    })
}




exports.addComment = (article_id, comment) => {
  const {username, body} = comment;
  const formattedComment = {author: username, body, article_id}
  // console.log('reached addComment mod', formattedComment)

  return connection
    .returning('*').from('comments')
    .insert(formattedComment)
    .then(([comment]) => {
      return comment
    })
}

exports.fetchComments = (article_id, sort_by, order) => {
  console.log('reached modelsortby', sort_by, 'order', order, 'article:', article_id)
  return connection
  // .select('comment_id', 'votes', 'created_at', 'author', 'body').from('comments')
  .select('*').from('comments')
  // .where('article_id', article_id)
    // .orderBy(sort_by, order)
    .then(comments => {
      console.log('the MOD articles', articles)
      return comments
    })
}