import express from "express";
import path from "path";
const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send(`Welcome to Todo app!`);
})

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
})