import OI from "mongodb";
const { ObjectId } = OI;

export default {
  index(req, res) {
    res.render("./products/index.ejs");
    db.collection("product").find();
  },

  create(req, res) {
    db.collection("product").insertOne(req.body, (err, result) => {
      if (err) return console.log(err);

      console.log("Salvo no Banco de Dados");
      res.redirect("/show_product");
    });
  },

  show(req, res) {
    db.collection("product")
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        res.render("./products/show.ejs", { data: results });
      });
  },

  getEdit(req, res) {
    const id = req.params.id;

    db.collection("product")
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render("./products/edit.ejs", { data: result });
      });
  },
  postEdit(req, res) {
    const id = req.params.id;
    const product = req.body.product;
    const price = req.body.price;

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
  },

  delete(req, res) {
    const id = req.params.id;

    db.collection("product").deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) return res.send(500, err);
      console.log("Deletado do Banco de Dados!");
      res.redirect("/show_product");
    });
  },
};
