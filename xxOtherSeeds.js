const {topicData} = require('./db/data/index')

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(topicData)
        .returning('*')
        .then((anyTopics) => {
          console.log(anyTopics)
        })
    })
    .then(stuff => {
      console.log(stuff)
    })
}