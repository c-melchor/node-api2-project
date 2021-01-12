const knex = require("knex");
const config = require("../.././knexfile");
const db = knex(config.development);

module.exports = {
  find,
  findById
  //   update
};

function find() {
  return db("posts");
}

function findById(id) {
  return db("posts").where({ id: Number(id) });
}
