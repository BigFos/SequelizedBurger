const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

var app = express();

var db = require("./models");


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));


app.use(methodOverride("_method"));


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");
// var routes = require("./controllers/burgers_controller.js")(app);

app.use("/", routes);

db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});