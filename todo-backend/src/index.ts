import express from "express";
import path from "path";
import { db } from "./database";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

// allow cors
app.use(cors());
app.options('*', cors());
// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send(`Welcome to Todo app!`);
});

// routes
var todoRoutes = require('./routes/todo.route');
app.use('/todo', todoRoutes);

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
  // connecting to db
  db.initDb();
  console.log(`Ok. Connected to PG`);
})