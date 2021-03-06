const { fetchArticles, fetchArticle, updateArticle, addComment, fetchComments } = require('../models/m-articles')

exports.getArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(({ articles, total_count }) => {
      res.status(200).send({ articles, total_count })
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
  
  updateArticle(req.params.article_id, req.body.inc_votes)
    .then(article => {
      res.status(200).send({ article })
    })
    .catch(err => next(err))
}

exports.postComment = (req, res, next) => {
  addComment(req.params.article_id, req.body)
    .then(comment => {
      res.status(201).send({ comment })
    })
    .catch(err => next(err))
}

exports.getComments = (req, res, next) => {
  
  fetchComments(req.params.article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments })
    })
    .catch(err => next(err))
}