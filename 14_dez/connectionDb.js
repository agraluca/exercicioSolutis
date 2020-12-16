import MC from "mongodb";
import OI from "mongodb";
import env from "dotenv";

function connectionMongo() {
  console.log("teste");
  env.config();

  // DB config
  const { MongoClient } = MC;

  global.connection = MongoClient.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) return console.log(err);
      global.db = client.db("solutis");
    }
  );
}

export default connectionMongo;
