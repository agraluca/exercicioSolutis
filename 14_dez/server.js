import express from "express";
import cors from "cors";
import MC from "mongodb";
import OI from "mongodb";
import env from "dotenv";

// App config
let db;
env.config();
const port = 3000 || process.env.PORT;
const app = express();

// Ejs
app.set("view engine", "ejs");

// Middleweres
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB config
const { MongoClient } = MC;
const { ObjectId } = OI;
MongoClient.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("solutis");
  }
);

// Routes User

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/show", (req, res) => {
  db.collection("data").insertOne(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log("Salvo no Banco de Dados");
    res.redirect("/show");
  });
});

app.get("/", (req, res) => {
  var cursor = db.collection("data").find();
});

app.get("/show", (req, res) => {
  db.collection("data")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render("show.ejs", { data: results });
    });
});

app
  .route("/edit/:id")
  .get((req, res) => {
    var id = req.params.id;

    db.collection("data")
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

    db.collection("data").updateOne(
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

app.route("/delete/:id").get((req, res) => {
  var id = req.params.id;

  db.collection("data").deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err);
    console.log("Deletado do Banco de Dados!");
    res.redirect("/show");
  });
});

// Routes Produtos

app.get("/product", (req, res) => {
  res.render("index_product.ejs");
});

app.post("/show_product", (req, res) => {
  db.collection("product").insertOne(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log("Salvo no Banco de Dados");
    res.redirect("/show_product");
  });
});

app.get("/product", (req, res) => {
  var cursor = db.collection("product").find();
});

app.get("/show_product", (req, res) => {
  db.collection("product")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render("show_product.ejs", { data: results });
    });
});

app
  .route("/edit_product/:id")
  .get((req, res) => {
    var id = req.params.id;

    db.collection("product")
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

    db.collection("product").updateOne(
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

app.route("/delete_product/:id").get((req, res) => {
  var id = req.params.id;

  db.collection("product").deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err);
    console.log("Deletado do Banco de Dados!");
    res.redirect("/show_product");
  });
});

// Listener
app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
