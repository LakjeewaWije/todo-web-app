import express from "express";
import path from "path";
import { db } from "./database";
const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send(`Welcome to Todo app!`);
})

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
  // connecting to db
  db.initDb();
  console.log(`Ok. Connected to PG`);
})