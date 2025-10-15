require("reflect-metadata");
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGSQL_HOST,
  port: process.env.PGSQL_PORT,
  username: process.env.PGSQL_USERNAME,
  password: process.env.PGSQL_PASSWORD,
  database: process.env.PGSQL_DB,
  entities: [__dirname + "/../entities/*.js"],
  logging: true,
  synchronize: true,
});

const connectPostgresDB = async () => {
  await AppDataSource.initialize().then(() => {
    console.log("✅ PostgreSQL connected with TypeORM");
  }).catch((err) => {
    throw new Error(`PostgreSQL connection Error: ${err.message}`);
  });
}

module.exports = {
  connectPostgresDB,
  AppDataSource
}