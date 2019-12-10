const connection = require('../db/connection');

exports.fetchUser = (username) => {
  console.log('reached model')
  return connection  
    .select('*').from('users')
    .where('username', username)
    .then(([user]) => {
      // console.log('this is the user in model:', user)
      if (!user) return Promise.reject({ status: 404, msg: 'Not Found'})
      else return user;
    })
}