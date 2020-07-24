var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
var bodyParser = require("body-parser");

//parse JSON data and url encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up handlebars middleware
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// listen on port 64778
app.set("port", 64778);

// render the GetRequest template for / GET requests
app.get("/", function(req, res) {
	// get keys of data objet
	let dataKeys = Object.keys(req.query);
	// map the keys
	let formattedData = dataKeys.map(key => ({'data': key, 'value': req.query[key]}));
	// object with info
	let dataToDisplay = {'clientInfo': formattedData};
	// render the template and send data
	res.render('GetRequest', dataToDisplay);
});

// for POST requests, render PostRequest template
app.post('/', function(req,res){
	// get keys of query object
	let dataKeys = Object.keys(req.query);
	// map the query keys
	let formattedData = dataKeys.map(key => ({'data': key, 'value': req.query[key]}));
	// console.log(req.body)
	// get keys from body of request
	let bodyKeys = Object.keys(req.body);
	// map the data in req.body
	let formattedBodyData = bodyKeys.map(key => ({'data': key, 'value': req.body[key]}));
	// object with info
	let dataToDisplay = {'urlInfo': formattedData, 'bodyInfo': formattedBodyData};
	// render the template and send data
	res.render('PostRequest', dataToDisplay);
});

app.use(function(req, res) {
  res.status(404);
  res.render("404");
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.send("500 - Server Error");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
