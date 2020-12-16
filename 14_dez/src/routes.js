import express from "express";
import OI from "mongodb";
const routes = express.Router();

const { ObjectId } = OI;

routes.get("/", (req, res) => {
  res.render("index.ejs");
});

routes.post("/show", (req, res) => {
  global["collection"] = global.db
    .collection("data")
    .insertOne(req.body, (err, result) => {
      if (err) return console.log(err);

      console.log("Salvo no Banco de Dados");
      res.redirect("/show");
    });
});

routes.get("/", (req, res) => {
  global["collection"] = global.db.collection("data").find();
});

routes.get("/show", (req, res) => {
  global.db
    .collection("data")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render("show.ejs", { data: results });
    });
});

routes
  .route("/edit/:id")
  .get((req, res) => {
    var id = req.params.id;

    global["collection"] = global.db
      .collection("data")
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render("edit.ejs", { data: result });
      });
  })
  .post((req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var surname = req.body.surname;

    global.db.collection("data").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          surname: surname,
        },
      },
      (err, result) => {
        if (err) return res.send(err);
        res.redirect("/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  });

routes.route("/delete/:id").get((req, res) => {
  var id = req.params.id;

  global["collection"] = global.db
    .collection("data")
    .deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) return res.send(500, err);
      console.log("Deletado do Banco de Dados!");
      res.redirect("/show");
    });
});

// Routes Produtos

routes.get("/product", (req, res) => {
  res.render("index_product.ejs");
});

routes.post("/show_product", (req, res) => {
  global["collection"] = global.db
    .collection("product")
    .insertOne(req.body, (err, result) => {
      if (err) return console.log(err);

      console.log("Salvo no Banco de Dados");
      res.redirect("/show_product");
    });
});

routes.get("/product", (req, res) => {
  global["collection"] = global.db.collection("product").find();
});

routes.get("/show_product", (req, res) => {
  global.db
    .collection("product")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render("show_product.ejs", { data: results });
    });
});

routes
  .route("/edit_product/:id")
  .get((req, res) => {
    var id = req.params.id;

    global["collection"] = global.db
      .collection("product")
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render("edit_product.ejs", { data: result });
      });
  })
  .post((req, res) => {
    var id = req.params.id;
    var product = req.body.product;
    var price = req.body.price;

    global.db.collection("product").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          product,
          price,
        },
      },
      (err, result) => {
        if (err) return res.send(err);
        res.redirect("/show_product");
        console.log("Atualizado no Banco de Dados");
      }
    );
  });

routes.route("/delete_product/:id").get((req, res) => {
  var id = req.params.id;

  global["collection"] = global.db
    .collection("product")
    .deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) return res.send(500, err);
      console.log("Deletado do Banco de Dados!");
      res.redirect("/show_product");
    });
});

export default routes;
