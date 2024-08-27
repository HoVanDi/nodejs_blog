const Course = require("../models/Course");

class SiteController {
  //[GET, /]
  async index(req, res) {
    try {
      const course = await Course.find();
      res.json(course);
    } catch (error) {
      res.status(400).json({ error: "Couldn't find" });
    }
    // res.render("home");
  }

  //[GET, search]
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
