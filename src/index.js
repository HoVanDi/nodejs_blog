const morgan = require("morgan");
const express = require("express");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

const SortMiddlewares =require("./app/middlewares/SortMiddlewares")

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

//custom Middlewares
app.use(SortMiddlewares);


// Templates engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable:(field, sort)=>{

        sortType =  field ===sort.column ? sort.type : "default";
        const icons = {
          default: "fa-solid fa-sort",
          asc:"fa-solid fa-arrow-down-short-wide",
          desc:"fa-solid fa-arrow-down-wide-short"
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
            <i class="${icon}"></i>
          </a>`;

      }
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
