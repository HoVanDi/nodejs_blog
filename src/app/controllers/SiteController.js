const Course = require("../models/Course");

const { mutipleMongooseToObject } = require("../../until/mongoose");

class SiteController {
  //[GET, /]
  index(req, res, next) {
    Course.find({}) //truyên dữ liệu qua view để show ra UI
      .then((courses) => {
        res.render("home", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  //[GET, search]
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
