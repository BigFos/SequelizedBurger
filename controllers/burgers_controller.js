var express = require("express");

var router = express.Router();

var db = require("../models");

  router.get("/", function(req, res) {

    db.Burger.findAll({}).then(function(dbBurger) {
        var hbsObject = {
            burgers: dbBurger
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
  });

  router.post("/", function(req, res) {

    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurger) {
      res.redirect("/");
    })
    .catch(function(err) {
      res.json(err);
    });
  });

  router.put("/:id", function(req, res) {

    db.Burger.update({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
        res.redirect("/");
    })
    .catch(function(err) {
      res.json(err);
    });
  });

module.exports = router;