const sql =
  "Create table if not exists users(id integer primary key, name text, role text, username text, password text)";

function create_users(my_database) {
  my_database.run(sql);
}

module.exports = {
  create_users,
};
