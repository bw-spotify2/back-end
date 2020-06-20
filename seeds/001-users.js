const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'JamesB', password: bcrypt.hashSync("password", 14)},
        {id: 2, username: 'JacobH', password: bcrypt.hashSync("password", 14)},
        {id: 3, username: 'DaisyR', password: bcrypt.hashSync("password", 14)}
      ]);
    });
};
