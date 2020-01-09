
exports.up = function(knex) {
  
  return knex.schema.createTable('comments', (table) => {
    table.increments('comment_id').primary()
    table.string('author').references('users.username')
    table.integer('article_id').references('articles.article_id').notNullable().onDelete('CASCADE')
    table.integer('votes').defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('body', 5000)
   })
};

exports.down = function(knex) {
  
  return knex.schema.dropTable('comments')
};
