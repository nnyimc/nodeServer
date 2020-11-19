var express = require('express');
var deviseApiRoutes = require('./devise-api-routes');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();

app.use(jsonParser);
app.use(deviseApiRoutes.apiRouter);

app.use('/html', express.static(__dirname+"/html"))
app.get('/', function(request, response){
    response.redirect('/html/index.html');
});

app.listen(8298, function(){
    console.log("http://localhost:8298");
});