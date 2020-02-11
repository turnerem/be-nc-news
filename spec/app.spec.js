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
  it('GET: 200 provide json of all available endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({body: {endpoints} = {}}) => {
        expect(endpoints).to.have.keys('GET /api', 'GET /api/topics', 'GET /api/articles')
      })
  })
  it('DELETE: 405 only GET method alloweed on this endpoint', () => {
    return request(app)
      .del('/api')
      .expect(405)
      .then(({body: {msg} ={}}) => {
        expect(msg).to.equal('Method Not Found')
      })
  })
  describe('/not-a-route', () => {
    it('GET: /not-a-route 404 bad request if route does not exist', () => {
    return request(app)
      .get('/papi')
      .expect(404)
      .then(({body: {msg} = {}}) => {
        expect(msg).to.equal('Route Not Found')
      })
    })
  })
  describe('/topics', () => {
    it('GET: 200 returns topics', () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({body: {topics_res} = {}}) => {
       
        const { topics, topic_art_dates } = topics_res;
        expect(topics[0]).to.have.keys('slug', 'description')
        expect(topic_art_dates[0]).to.have.keys('created_at', 'topic')
      })
    })
    it('PATCH: 405 method not found', () => {
      return request(app)
        .patch('/api/topics')
        .expect(405)
        .then(({body: {msg} = {}}) => {
          expect(msg).to.equal('Method Not Found')
        })
    })
    
  })
  describe('/:username', () => {
    describe('/users', () => {
      it('GET: 200 returns user object for a username that exists', () => {
        return request(app)
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(response => {
            
            expect(response.body.user).to.have.keys('username', 'avatar_url', 'name')
          })
      })
      it('GET: 404 sends error message when given valid but non-existent username', () => {
        return request(app)
          .get('/api/users/jimminy')
          .expect(404)
          .then((response) => {
            
            expect(response.body.msg).to.equal('Not Found')
          })
      })      
      it('GET: 405 if method other than get is attempted on /api/users endpoint', () => {
        return request(app)
          .put('/api/users/butter_bridge')
          .expect(405)
          .then((response) => {
            expect(response.body.msg).to.equal('Method Not Found')
          })
      })      
    })
  })
  describe('/articles', () => {
    it('GET: 200 returns all articles if no queries specified, and also a total count', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body: {articles, total_count} = {}}) => {
          expect(articles[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count')
          expect(total_count).to.equal(12)
        })
    })
    it('GET: 200 returns all articles sorted by date descending by default', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body: {articles} = {}}) => {
          
          expect(articles[0]).to.have.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count')
          expect(articles).to.be.sortedBy('created_at', {descending: true})
        })
    })
    it('GET: 200 can limit articles returned to 5. Total count still 12', () => {
      return request(app)
        .get('/api/articles?limit=5')
        .expect(200)
        .then(({body: {articles, total_count} = {}}) => {
          expect(articles.length).to.equal(5)
          expect(total_count).to.equal(12)
        })
    })
    it('GET: 200 can show the next 5 articles', () => {
      return request(app)
        .get('/api/articles?limit=5&p=2')
        .expect(200)
        .then(({body: {articles} = {}}) => {
          expect(articles[0].title).to.equal('A')
        })
    })
    it('GET: 200 can sort by votes ascending, for author icellusedkars only. Total count is for author articles only', () => {
      return request(app)
        .get('/api/articles?sort_by=votes&order=asc&author=icellusedkars')
        .expect(200)
        .then(({body: {articles, total_count} = {}}) => {
          const checkAuthor = article => {
            return article.author === 'icellusedkars'
          }
          expect(articles.every(checkAuthor)).to.be.true;
          expect(articles).to.be.sortedBy('votes', {descending: false})
          expect(total_count).to.equal(6)
        })
    })
    it('GET: 200 returns empty array if author exists but does not have any associated articles', () => {
      return request(app)
        .get('/api/articles?sort_by=votes&order=asc&author=lurker')
        .expect(200)
        .then(({body: {articles} = {}}) => {
          expect(articles.length).to.equal(0);
        })
    })
    it('GET: 404 for non-existent author icecream', () => {
      return request(app)
      .get('/api/articles?sort_by=votes&order=asc&author=icecream')
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
    // /api/articles?sort_by=not-a-column
    it('GET: 400 returns error message if invalid sort_by column provided', () => {
      return request(app)
        .get('/api/articles?sort_by=not-a-column')
        .expect(400)
        .then(({body: {msg} = {}}) => {
          expect(msg).to.equal('Invalid Query')
        })
    })
    it('PATCH: 405 not allowed to patch to /api/articles', () => {
      return request(app)
        .patch('/api/articles')
        .expect(405)
        .then(({body: {msg} ={}}) => {
          expect(msg).to.equal('Method Not Found')
        })
    })
    describe('/:article_id', () => {
      it('GET: 200 returns article for a given article_id', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((response) => {
            expect(response.body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count')
            
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
      it('GET: 400 returns Bad Request when given invalid article_id', () => {
        return request(app)
          .get('/api/articles/pencil')
          .expect(400)
          .then(({body: {msg} = {}}) => {
            expect(msg).to.equal('Bad Request')
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
          })
      })
      it('PATCH: 200 ignore patch request with no info in body and return article to client unchanged', () => {
        return request(app)
          .patch('/api/articles/1')
          .expect(200)
          .then(({body: {article} ={}}) => {
            expect(article.votes).to.equal(100)
          })
      })
      describe('/comments', () => {
        it('POST: 201 posts comment for an article', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ username: 'rogersop', body: 'I am a comment'})
            .expect(201) 
            .then(({body: {comment} = {}}) => {
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
              
              // const { comment } = response.body;
              expect(msg).to.equal('Author Not Found')
            })
          })
        })
        it('POST: 400 does not permit posting invalid comment', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ pusername: 'penelope', body: 'I am a comment'})
            .expect(400) 
            .then(({body: {msg} = {}}) => {
              
              // const { comment } = response.body;
              expect(msg).to.equal('Bad Request')
            })
          })
        })
        it('GET: 200 returns array of all comments associated with an article_id', () => {
          return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
            .then(({body: {comments} = {}}) => {
              expect(comments[0]).to.have.keys('comment_id', 'votes', 'created_at', 'author', 'body')
              
              // expect(comments).to.be.sortedBy('created_at', {descending: true})
            })
        })
        it('GET: 200 sorts by created_at, descending by default', () => {
          return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
            .then(({body: {comments} = {}}) => {
              
              expect(comments).to.be.sortedBy('created_at', {descending: true})
            })
        })
        it('GET: 200 sorts by votes, ascending if requested', () => {
          return request(app)
          .get('/api/articles/1/comments?sort_by=votes&order=asc')
          .expect(200)
            .then(({body: {comments} = {}}) => {
              
              expect(comments).to.be.sortedBy('votes', {descending: false})
            })
        })
        it('GET: 200 returns only 3 comments if that is all we want', () => {
          return request(app)
          .get('/api/articles/1/comments?limit=2')
          .expect(200)
            .then(({body: {comments} = {}}) => {
              
              expect(comments.length).to.equal(2)
            })
        })
        it('GET: 404 if article not found', () => {
          return request(app)
          .get('/api/articles/90/comments')
          .expect(404)
            .then(({body: {msg} = {}}) => {
              
              expect(msg).to.equal('Article Not Found')
            })
        })
        it('GET: 400 returns error message if invalid sort_by column provided', () => {
          return request(app)
            .get('/api/articles/1/comments?sort_by=not-a-column')
            .expect(400)
            .then(({body: {msg} = {}}) => {
              expect(msg).to.equal('Invalid Query')
            })
        })
        
      })
   
    describe('/comments', () => {
      // it('GET: 200 gets all comments XXDELETEME', () => {
      //   return request(app)
      //     .get
      // })
      describe('/:comment_id', () => {
        it('PATCH: 200 updates comment with a new vote', () => {
          return request(app)
            .patch('/api/comments/3')
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({body: {comment} = {}}) => {
              expect(comment.votes).to.equal(101)
              expect(comment).to.have.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
            })
        })
        it('PATCH: 200 updates comment with a downvotes', () => {
          return request(app)
            .patch('/api/comments/1')
            .send({ inc_votes: -20 })
            .expect(200)
            .then(({body: {comment} = {}}) => {
              expect(comment.votes).to.equal(-4)
            })
        })
        it('PATCH: 200 with no update if no info provided in body of request', () => {
          return request(app)
            .patch('/api/comments/1')
            .expect(200)
            .then(({body: {comment} = {}}) => {
              expect(comment.votes).to.equal(16)
            })
        })
        it('PATCH: 200 with no update if wrong info provided in body of request', () => {
          return request(app)
            .patch('/api/comments/1')
            .send({ pinc_votes: 1 })
            .expect(200)
            .then(({body: {comment} = {}}) => {
              expect(comment.votes).to.equal(16)
            })
        })
        it('PATCH: 404 if comment does not exist', () => {
          return request(app)
            .patch('/api/comments/79')
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({body: {msg} = {}}) => {
              expect(msg).to.equal('Comment Not Found')
            })
        })
        it('DELETE: 204 deletes comment if it exists, does not return anything on body of response', () => {
          return request(app)
            .del('/api/comments/1')
            .expect(204)
            .then(({body}) => {
              
              expect(Object.keys(body).length).to.equal(0)
              // expect(comment.votes).to.equal(16)
            })
        })
        it('DELETE: 404 if comment does not exist', () => {
          return request(app)
            .del('/api/comments/10000')
            .expect(404)
            .then(({body: {msg} = {}}) => {
              
              expect(msg).to.equal('Comment Not Found')
            })
        })
      })
    })
  

  })