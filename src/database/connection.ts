import knex from "knex";

const connection = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "nlw1",
    port: 5432,
  },
});

export default connection;
