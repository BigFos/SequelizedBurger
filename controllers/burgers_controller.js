var express = require("express");

var router = express.Router();

var db = require("../models");

// module.exports = function(app) {

  // GET route for getting all of the todos
  router.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function(dbBurger) {
        var hbsObject = {
            burgers: dbBurger
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
      // We have access to the todos as an argument inside of the callback function
      // res.json(dbBurger);
    });
  });
// router.get("/", function(req, res) {
//     burger.all(function(data) {
//         var hbsObject = {
//             burgers: data
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject);
//     });
// });
  // POST route for saving a new todo
  router.post("/", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurger) {
      // We have access to the new todo as an argument inside of the callback function
      // res.json(dbBurger);
      res.redirect("/");
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });

  // router.post("/", function(req, res) {
//     burger.create([
//         "burger_name", "devoured"
//     ], [
//         req.body.burger_name, req.body.devoured
//     ], function() {
//         res.redirect("/");
//     });
// });

  // // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // // req.params.id
  // app.delete("/api/todos/:id", function(req, res) {
  //   // We just have to specify which todo we want to destroy with "where"
  //   db.Todo.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbBurger) {
  //     res.json(dbBurger);
  //   });

  // });

  // PUT route for updating todos. We can get the updated todo data from req.body
  router.put("/:id", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Burger.update({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
        res.redirect("/");
      // res.json(dbBurger);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });
// };

// router.put("/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     console.log("condition", condition);

//     burger.update({
//         devoured: req.body.devoured
//     }, condition, function() {
//         res.redirect("/");
//     });
// });

module.exports = router;