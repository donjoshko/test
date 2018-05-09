const express = require('express');
const app = express();
// Auswertung der Post-Parameter
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// Initialisierung der Template Engine EJS
app.engine('/.ejs',require('ejs').__express);
app.set('view engine', 'ejs');

const port = 3000;
app.listen(port,function(){
	console.log('Listen on port ' + port);
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.post('/calculate',function(req,res){
	const bitrate = req.body['bitrate'];
	const duration = req.body['duration'];
	
	if(isNaN(bitrate) || isNaN(duration) || bitrate < 0 || duration < 0){
		console.log('bitte eingabe überprüfen');
		res.render('error',{
			'Bitrate' : bitrate,
			'Duration' : duration,
			'message' : 'Bitte eingabe überprüfen.'
		});
	} else{
		console.log('bitrate: ' + bitrate + ' duration: ' + duration);
		res.render('result',{
			'Bitrate' : bitrate,
			'Duration' : duration,
			'result' : bitrate*duration
	});
	}
	
});