
exports.up = function(knex) {
  
  return knex.schema.createTable('articles', (table) => {
    table.increments('article_id').primary()
    table.string('title')
    table.string('body', 5000)
    table.integer('votes').defaultTo(0)
    table.string('topic').references('topics.slug').notNullable()
    table.string('author').references('users.username').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  
  return knex.schema.dropTable('articles')
};
