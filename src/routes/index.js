const courseRouter = require("./courses");
const meRouter = require("./me");
const newsRouter = require("./news");
const SiteRouter = require("./site");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/course", courseRouter);
  app.use("/me", meRouter);

  app.use("/", SiteRouter);

}

module.exports = route;
