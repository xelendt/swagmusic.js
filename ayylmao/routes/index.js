var express = require('express');
var router = express.Router();
// var twilio = require("twilio")("SKe123538ec0d05993e10b7ac024154f4f", "OARuYI2Cg9oDOwi938tudwuCC6tuCF3m");
var twilio = require("twilio");
var http = require("http");
var io = require('socket.io')(80);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.render('index', { title: 'Express' });
});

router.get('/twilio', function(req, res, next) {
	var twiml = new twilio.TwimlResponse();
	msg = req.query.Body;
	console.log(msg);
	io.emit("url", msg);
	twiml.sms("Your song has been added!");
	res.type("text/xml");
	res.send(twiml.toString());
});


module.exports = router;

