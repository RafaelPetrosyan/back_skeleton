const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const product_schema = require("./entities/products_schema");
const user_schema = require("./entities/users_schema");
const user_routes = require("./routes/users_routes");
const app = express();
const port = 5000;
app.use(express.json());
const jwt = require("jsonwebtoken");
require("dotenv").config();

let db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    console.log("Error");
  }
  console.log("Connected to the database");
});

product_schema.create_products(db);
user_schema.create_users(db);
user_routes.create_users_routes_get(app);
user_routes.create_users_routes_get_id(app);
user_routes.create_users_routes_post(app);
user_routes.create_users_routes_put(app);
user_routes.create_users_routes_delete(app);
user_routes.create_users_routes_register(app);
user_routes.create_users_routes_login(app);

app.listen(port);
