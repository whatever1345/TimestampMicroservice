var express = require('express'); 
var path = require('path');
 
var app = express();
var PORT = process.env.PORT || 3000;     

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', { title: 'Timestamp' });
});
 
app.get('/:timestamp', function(request, response) {
  var timestamp = request.params.timestamp;
  response.json(getTimestampJSON(timestamp));
});
 
app.listen(PORT, function() {
  console.log('Server is listening on port ' + PORT);
});

function getTimestampJSON(timestamp) {

	var result = {
		unix: null,
		natural: null
	};
 
	var date;
	if (!isNaN(parseInt(timestamp))) {
		date = new Date(parseInt(timestamp));
	} else {
		date = new Date(timestamp);
	}
 
	if (!isNaN(date.getTime())) {
		result.unix = date.getTime();
		result.natural = getNaturalDate(date);
	}
 
	return result;
}

function getNaturalDate(date) {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Obt', 'Nov', 'Dec'];
 
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}