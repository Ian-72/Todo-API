require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_MYSQL_USER,
    password: process.env.DEV_MYSQL_PASSWORD,
    database: process.env.DEV_MYSQL_DBNAME,
    host: process.env.DEV_MYSQL_HOST,
    dialect: 'mysql',
    charset: 'utf8mb4',
    logging: false,
    timezone: '+07:00', // for writing to database
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    charset: 'utf8mb4',
    logging: false,
    timezone: '+07:00', // for writing to database
  },
};
