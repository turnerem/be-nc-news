const { fetchArticles, fetchArticle, updateArticle, addComment, fetchComments } = require('../models/m-articles')

exports.getArticles = (req, res, next) => {
  const sorting = req.query.sort_by || 'created_at:desc';
  const sort_by = (sorting.split(':')[0] === undefined | sorting.split(':')[0] === 'date') ? 'created_at' : sorting.split(':')[0];
  const order = sorting.split(':')[1] || 'desc';
  const author = req.query.author || undefined;
  const topic = req.query.topic || undefined;

  // console.log('reached QUERY', sorting, author, topic)
  fetchArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send({ articles })
    })
    .catch(err => next(err))
}

exports.getArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then(article => {
      res.status(200).send({ article })
    })
    .catch(err => next(err))
}

exports.patchArticle = (req, res, next) => {
  console.log(req.body, 'THE REQUEST')
  updateArticle(req.params.article_id, req.body.inc_votes)
    .then(article => {
      res.status(200).send({ article })
    })
    .catch(err => next(err))
}

exports.postComment = (req, res, next) => {
  addComment(req.params.article_id, req.body)
    .then(comment => {
      res.status(200).send({ comment })
    })
    .catch(err => next(err))
}

exports.getComments = (req, res, next) => {
  const query = req.query.sort_by || 'created_at:desc'
  const sort_by = query.split(':')[0] || 'created_at';
  const order = query.split(':')[1] || 'desc';
  // console.log('sortby', sort_by, 'order', order, 'article:', req.params.article_id)
  fetchComments(req.params.article_id, sort_by, order)
    .then(comments => {
      res.status(200).send({ comments })
    })
    .catch(err => next(err))
}