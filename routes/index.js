var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/checkEqual', function(req, res, next) {
	var source = req.body.source;
	var destination = req.body.destination;
	res.send({
		"equal": source === destination
	});
});

module.exports = router;
