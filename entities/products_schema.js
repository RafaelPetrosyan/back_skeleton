const sql =
  "Create table if not exists products(id integer primary key, name text, price integer)";

function create_products(my_database) {
  my_database.run(sql);
}

module.exports = { create_products };
