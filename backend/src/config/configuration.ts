export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: 'username',
    password: 'password',
    database: 'database',
    entities: 'entities',
    synchronize: 'synchronize'
  },
});

export const cf = {
  port: 'port',
  database: {
    type: 'type',
    host: 'host',
    port: 'port',
    username: 'username',
    password: 'password',
    database: 'database',
    entities: 'entities',
    synchronize: 'synchronize'
    
  },
};
