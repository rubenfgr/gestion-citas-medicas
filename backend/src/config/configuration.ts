export default () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    synchronize: process.env.DB_SYNCHRONIZE,
  },
});

export const cf = {
  port: 'port',
  database: {
    host: 'database.host',
    port: 'database.port',
    username: 'database.username',
    password: 'database.password',
    database: 'database.database',
    synchronize: 'database.synchronize',
  },
};
