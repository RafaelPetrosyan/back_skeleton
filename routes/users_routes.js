const user_controller = require("../controller/user_controller");
const jwt_authenticate = require("../authn/jwt");

function create_users_routes_get(app) {
  app.get("/", user_controller.get_product);
}

function create_users_routes_get_id(app) {
  app.get("/product/:id", user_controller.get_product_id);
}

function create_users_routes_post(app) {
  app.post(
    "/new",
    jwt_authenticate.authenticateToken,
    user_controller.post_product
  );
}

function create_users_routes_put(app) {
  app.put(
    "/update/:id",
    jwt_authenticate.authenticateToken,
    user_controller.put_product
  );
}

function create_users_routes_delete(app) {
  app.delete(
    "/delete/:id",
    jwt_authenticate.authenticateToken,
    user_controller.delete_product
  );
}

function create_users_routes_register(app) {
  app.post("/register", user_controller.register_user);
}

function create_users_routes_login(app) {
  app.post("/login", user_controller.login_user);
}

module.exports = {
  create_users_routes_get,
  create_users_routes_get_id,
  create_users_routes_post,
  create_users_routes_put,
  create_users_routes_delete,
  create_users_routes_register,
  create_users_routes_login,
};
