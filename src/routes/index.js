const courseRouter = require("./courses");
const newsRouter = require("./news");
const SiteRouter = require("./site");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/course", courseRouter);

  app.use("/", SiteRouter);

}

module.exports = route;
