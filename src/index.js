const morgan = require("morgan");
const express = require("express");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

const db = require("./config/db");

//connect to DB
db.connect();

const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// HTTP Logger
app.use(morgan("combined"));

//custom method 
app.use(methodOverride("_method"));

// Templates engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Route
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
