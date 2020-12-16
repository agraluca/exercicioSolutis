import MC from "mongodb";
import env from "dotenv";

function connectionMongo() {
  env.config();

  // DB config
  const { MongoClient } = MC;

  MongoClient.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) return console.log(err);
      global.db = client.db("solutis");
    }
  );
}

export default connectionMongo;
