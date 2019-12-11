process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const connection = require('../db/connection');
const app = require('../app');

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
            console.log('topics in spec', response.body)
            expect(response.body.user).to.have.keys('username', 'avatar_url', 'name')
          })
      })
      it('GET: 404 sends error message when given valid but non-existent username', () => {
        return request(app)
          .get('/api/users/jimminy')
          .expect(404)
          .then((response) => {
            console.log(response.body)
            expect(response.body.msg).to.equal('Not Found')
          })
      })      
    })
  })
  describe('/articles', () => {
    describe('/:article_id', () => {
      it('GET: 200 returns article for a given article_id', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((response) => {
            expect(response.body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count')
            console.log(response.body)
          })
      })
      it('GET: 404 returns Not Found when given valid but non-existent article_id', () => {
        return request(app)
          .get('/api/articles/979')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).to.equal('Not Found')
          })
      })
      it('PATCH: 200 increments votes accordingly', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 33})
          .expect(200)
          .then((response) => {
            expect(response.body.article.votes).to.equal(133)
            expect(response.body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count')
          })
      })
      it.only('PATCH: 200 permits a negative vote count', () => {
        return request(app)
          .patch('/api/articles/3')
          .send({ inc_votes: -33})
          .expect(200)
          .then((response) => {
            expect(response.body.article.votes).to.equal(-33)
            expect(response.body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count')
          })
      })
    })
  })
})
