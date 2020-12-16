import express from "express";
import cors from "cors";
import env from "dotenv";
import routes from "./src/routes.js";
import connectionMongo from "./connectionDb.js";

// App config
env.config();
const port = 5000 || process.env.PORT;
const app = express();

// Ejs
app.set("view engine", "ejs");

// Middleweres
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB config
connectionMongo();

// Routes
app.use(routes);

// Listener
app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
