const Course = require("../models/Course");

const { mongooseToObject } = require("../../until/mongoose");

class CourseController {
  //[GET] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /course/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[POST] /course/store
  async store(req, res, next) {
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${req.body.video}/hq720.jpg`;
    const course = new Course(req.body);
    await course.save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
}

module.exports = new CourseController();
