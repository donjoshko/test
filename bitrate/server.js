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