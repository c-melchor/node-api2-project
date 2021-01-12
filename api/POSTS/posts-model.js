const knex = require("knex");
const config = require("../.././knexfile");
const db = knex(config.development);

module.exports = {
  find
  //   update
};

function find() {
  return db("posts");
}
