const express = require('express')

const request = require('request')
const nasaKey = require('./secrets.js')

var app = express()


var key = nasaKey.Key


app.use(express.static('./public'))


app.get('/', function(req, res) {

	res.sendFile('./public/html/index.html', {root:'./'})

	console.log('sent index.html')

})

app.get('/search', function(req, res) {
	

		var nasaAPI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.start_date}&end_date=${req.query.start_date}&api_key=${key}`
		request (nasaAPI, function(err, response, dataFromServer) {
			
			res.send(dataFromServer)
			
			console.log('single-date api')
		})
	})

app.get('/range_search', function(req, res) {

		var nasaAPI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.start_date}&end_date=${req.query.end_date}&api_key=${key}`
		request (nasaAPI, function(err, response, dataFromServer) {
			
			res.send(dataFromServer)
			
			console.log('range-date api')
	})
})


var port = 8081

app.listen(port, function() {

	console.log("'NASA_part2' on port " + port)

})


