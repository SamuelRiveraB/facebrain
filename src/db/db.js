const knex = require("knex");

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });

module.exports = db;
