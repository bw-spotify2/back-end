// Update with your config settings.
const pgconnection = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      } 
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'postgres',
    connection: pgconnection,
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      } 
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds',
    }
  }

};
