module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: '',
  database: 'askmed',
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
