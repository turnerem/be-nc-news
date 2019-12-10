
exports.up = function(knex) {
  console.log('creating topics')
  return knex.schema.createTable('topics', (table) => {
    table.string('slug').primary()
    table.string('description')
  })
};

exports.down = function(knex) {
  console.log('removing topics')
  return knex.schema.dropTable('topics')
};
