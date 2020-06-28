import path from "path";

module.exports = {
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "nlw1",
    port: 5432,
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
};
