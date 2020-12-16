import OI from "mongodb";
const { ObjectId } = OI;

export default {
  index(req, res) {
    res.render("./user/index.ejs");
    global.db.collection("user").find();
  },

  create(req, res) {
    global.db.collection("user").insertOne(req.body, (err, result) => {
      if (err) return console.log(err);

      console.log("Salvo no Banco de Dados");
      res.redirect("/show");
    });
  },

  show(req, res) {
    global.db
      .collection("user")
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        res.render("./user/show.ejs", { data: results });
      });
  },

  getEdit(req, res) {
    const id = req.params.id;

    global.db
      .collection("user")
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render("./user/edit.ejs", { data: result });
      });
  },
  postEdit(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const surname = req.body.surname;

    global.db.collection("user").updateOne(
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
  },

  delete(req, res) {
    const id = req.params.id;
    global.db
      .collection("user")
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log("Deletado do Banco de Dados!");
        res.redirect("/show");
      });
  },
};
