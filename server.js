var express = require('express');

var app = express();
app.use(express.static('build'));

app.listen(process.env.PORT || 8080, process.env.IP);

var bodyParser = require('body-parser'); // this is used to parse the body of requests and response
var jsonParser = bodyParser.json();

app.use(bodyParser.json());


// Endpoints
app.get('/test', (req, res) => {
    res.send("Hello World");
});


app.post('/account', (req, res) => {
	console.log(req.body);
	return res.redirect('/');
})


