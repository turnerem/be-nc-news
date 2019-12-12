process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const chai = require('chai');
const chaiSorted = require('chai-sorted');
chai.use(chaiSorted)
const connection = require('../db/connection');
const app = require('../app');

const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../db/data/index.js');

const commentCount = commentData.length;

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/topics', () => {
    it('GET: 200 returns topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(response => {
          expect(response.body.topics[0]).to.have.keys('slug', 'description')
        })
    })
    
  })
  describe('/users', () => {
    describe('/:username', () => {
      it('GET: 200 returns user object for a username that exists', () => {
        return request(app)
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(response => {
            // console.log('topics in spec', response.body)
            expect(response.body.user).to.have.keys('username', 'avatar_url', 'name')
          })
      })
      it('GET: 404 sends error message when given valid but non-existent username', () => {
        return request(app)
          .get('/api/users/jimminy')
          .expect(404)
          .then((response) => {
            // console.log(response.body)
            expect(response.body.msg).to.equal('Not Found')
          })
      })      
    })
  })
  describe('/articles', () => {
    it('GET: 200 returns all articles if no queries specified', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body: {articles} = {}}) => {
          // console.log(articles, 'articles IN SPEC')
          expect(articles[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count')
        })
    })
    it('GET: 200 returns all articles sorted by date descending by default', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body: {articles} = {}}) => {
          // console.log(articles, 'articles IN SPEC')
          expect(articles[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count')
          expect(articles).to.be.sortedBy('created_at', {descending: true})
        })
    })
    it('GET: 200 can sort by votes ascending, for author icellusedkars only', () => {
      return request(app)
        .get('/api/articles?sort_by=votes:asc&author=icellusedkars')
        .expect(200)
        .then(({body: {articles} = {}}) => {
          const checkAuthor = article => {
            return article.author === 'icellusedkars'
          }
          expect(articles.every(checkAuthor)).to.be.true;
          expect(articles).to.be.sortedBy('votes', {descending: false})
        })
    })
    it('GET: 200 returns empty array if author exists but does not have any associated articles', () => {
      return request(app)
        .get('/api/articles?sort_by=votes:asc&author=lurker')
        .expect(200)
        .then(({body: {articles} = {}}) => {
          expect(articles.length).to.equal(0);
        })
    })
    it('GET: 404 for non-existent author icecream', () => {
      return request(app)
      .get('/api/articles?sort_by=votes:asc&author=icecream')
      .expect(404)
      .then(({body: {msg} = {}}) => {
        expect(msg).to.equal('Author Not Found')
      })
    })
    it('GET: 404 for non-existent topic', () => {
      return request(app)
        .get('/api/articles?topic=tea')
        .expect(404)
        .then(({body: {msg} = {}}) => {
          expect(msg).to.equal('Topic Not Found')
        })
    })
    describe('/:article_id', () => {
      it('GET: 200 returns article for a given article_id', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((response) => {
            expect(response.body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count')
            // console.log(response.body)
          })
      })
      it('GET: 404 returns Not Found when given valid but non-existent article_id', () => {
        return request(app)
          .get('/api/articles/979')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).to.equal('Article Not Found')
          })
      })
      it('PATCH: 200 increments votes accordingly', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 33})
          .expect(200)
          .then((response) => {
            expect(response.body.article.votes).to.equal(133)
            expect(response.body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes')
          })
      })
      it('PATCH: 200 permits a negative vote count', () => {
        return request(app)
          .patch('/api/articles/3')
          .send({ inc_votes: -33})
          .expect(200)
          .then((response) => {
            expect(response.body.article.votes).to.equal(-33)
            expect(response.body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes')
          })
      })
      describe('/comments', () => {
        it('POST: 200 posts comment for an article', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ username: 'rogersop', body: 'I am a comment'})
            .expect(200) 
            .then(({body: {comment} = {}}) => {
              // console.log('back to spec', comment)
              // const { comment } = response.body;
              expect(comment).to.have.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
              expect(comment.comment_id).to.equal(commentCount + 1)
            })
        })
        it('POST: 404 does not permit posting of comment for non-existent author', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ username: 'penelope', body: 'I am a comment'})
            .expect(404) 
            .then(({body: {msg} = {}}) => {
              // console.log('back to spec', msg)
              // const { comment } = response.body;
              expect(msg).to.equal('Author Not Found')
            })
          })
        })
        it.only('GET: 200 returns array of all comments associated with an article_id', () => {
          return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
            .then(({body: {comments} = {}}) => {
              console.log(comments)
              expect(comments[0]).to.have.keys('comment_id', 'votes', 'created_at', 'author', 'body')
              
              // expect(comments).to.be.sortedBy('created_at', {descending: true})
            })
        })
        it('GET: 200 sorts by created_at, descending by default', () => {
          return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
            .then(({body: {comments} = {}}) => {
              // console.log(comments)
              expect(comments).to.be.sortedBy('created_at', {descending: true})
            })
        })
        it('GET: 200 sorts by votes, ascending if requested', () => {
          return request(app)
          .get('/api/articles/1/comments?sort_by=votes:asc')
          .expect(200)
            .then(({body: {comments} = {}}) => {
              // console.log(comments)
              expect(comments).to.be.sortedBy('votes', {descending: false})
            })
        })
        
      })
    })
  })

