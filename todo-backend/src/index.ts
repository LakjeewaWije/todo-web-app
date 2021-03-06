import express from "express";
import path from "path";
import { db } from "./database";
import bodyParser from "body-parser";
import cors from "cors";

var app = express();

const port = 4000;

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

var subTaskRoutes = require('./routes/subtask.route');
app.use('/subtask', subTaskRoutes);

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
  // connecting to db
  db.initDb();
  console.log(`Ok. Connected to PG`);
})

export default app;