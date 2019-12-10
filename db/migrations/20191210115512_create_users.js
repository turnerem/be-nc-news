
exports.up = function(knex) {
  console.log('creating users')
  return knex.schema.createTable('users', (table) => {
    table.string('username').primary().unique()
    table.string('avatar_url')
    table.string('name')
  })
};

exports.down = function(knex) {
  console.log('removing users')
  return knex.schema.dropTable('users')
};
