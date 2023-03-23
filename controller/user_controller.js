const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("data.db");
const jwt = require("../authn/jwt");
const bcrypt = require("bcrypt");

function get_product(req, res) {
  db.all("select * from products", [], (err, data) => {
    res.send(data);
  });
}

function get_product_id(req, res) {
  const id = req.params.id;
  db.get("select * from products where id=?", [id], (err, data) => {
    res.send(data);
  });
}

function post_product(req, res) {
  const name = req.body.name;
  const price = req.body.price;
  db.run("insert into products(name, price) values(?,?)", [name, price], () => {
    res.send("OK");
  });
}

function put_product(req, res) {
  const name = req.body.name;
  const price = req.body.price;
  const id = req.params.id;
  db.run(
    "update products set name=?, price=? where id=?",
    [name, price, id],
    () => {
      res.send("OK");
    }
  );
}

function delete_product(req, res) {
  const id = req.params.id;
  db.get("delete from products where id=?", [id], () => {
    res.send("OK");
  });
}

function register_user(req, res) {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      res.send(JSON.stringify({ status: "Error generating salt" }));
      return;
    }

    bcrypt.hash(password, salt, function (err, hashed_password) {
      if (err) {
        res.send(JSON.stringify({ status: "Error hashing password" }));
        return;
      }

      db.run(
        "insert into users (name, role, username, password) values (?, ?, ?, ?)",
        [name, "user", username, hashed_password],
        (err) => {
          if (err) {
            res.send(JSON.stringify({ status: "Error registering user" }));
            return;
          }
          res.send(JSON.stringify({ status: "User created" }));
          console.log(hashed_password);
        }
      );
    });
  });
}

function login_user(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  db.get("select * from users WHERE username=?", [username], (err, row) => {
    if (err) {
      res.send(JSON.stringify({ status: "Error retrieving user" }));
      return;
    }

    bcrypt.compare(password, row.password, function (err, result) {
      if (err || !result) {
        res.send(JSON.stringify({ status: "Wrong credentials" }));
        return;
      }

      let token = jwt.generateAccessToken({
        username,
        userid: row.id,
        role: row.role,
      });
      res.send(JSON.stringify({ status: "Logged in", jwt: token }));
    });
  });
}

module.exports = {
  get_product,
  get_product_id,
  post_product,
  put_product,
  delete_product,
  register_user,
  login_user,
};
