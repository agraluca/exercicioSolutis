import express from "express";

//Controllers
import userController from "./controllers/userController.js";
import productsController from "./controllers/productsController.js";

const routes = express.Router();

// Routes User
routes.get("/", userController.index);
routes.post("/show", userController.create);
routes.get("/show", userController.show);
routes
  .route("/edit/:id")
  .get(userController.getEdit)
  .post(userController.postEdit);

routes.route("/delete/:id").get(userController.delete);

// Routes Produtos
routes.get("/product", productsController.index);
routes.post("/show_product", productsController.create);
routes.get("/show_product", productsController.show);
routes
  .route("/edit_product/:id")
  .get(productsController.getEdit)
  .post(productsController.postEdit);

routes.route("/delete_product/:id").get(productsController.delete);

export default routes;
