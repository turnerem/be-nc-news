
exports.up = function(knex) {
  console.log('creating comments')
  return knex.schema.createTable('comments', (table) => {
    table.increments('comment_id').primary()
    table.string('author').references('users.username')
    table.integer('article_id').references('articles.article_id')
    table.integer('votes').defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('body', 5000)
   })
};

exports.down = function(knex) {
  console.log('removing comments')
  return knex.schema.dropTable('comments')
};
