// Update with your config settings.
require('dotenv').config();
const pgconnection = process.env.DATABASE_URL;


module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'spotify_api',
      user: 'postgres',
      password: process.env.DB_PASSWORD.toString()
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: pgconnection,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds',
    }
  }

};
