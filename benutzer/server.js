const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.engine('ejs', require('ejs').__express);
app.set('view engine','ejs');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('benutzer.db', (error) => {
	if (error){
		console.error (error.message);
	}
	console.log('Connected to the database shop')
});

	const session = require('express-session');
	app.use(session({
	secret: 'example',
	resave: false,
	saveUnitialized: true	
	}));
			
	
			

const port = 3000;
app.listen(port,function(){
	console.log('Listen on port ' + port);
	let sql = 'SELECT * FROM users';
	db.all(sql, (error, rows) => {
		if (error) {
			if (rows == undefined) {
				sql = `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)`;
				db.run(sql);
			}
		}
	});
});


app.get('/',function(req,res){
	res.sendFile(__dirname + '/register.html');
});

app.get('/login',function(req,res){
	res.sendFile(__dirname + '/login.html');
});


app.post('/weiter',function(req,res){
	const user = req.body['user'];
	const pass = req.body['pass'];
	
	if (user === "" || pass === ""){
		res.send('bitte beide Felder ausfüllen');
	}
	else{
		let sql = `select * from users where username = '${user}'`;
		db.get(sql,function(error,rows){
		if (error){
			if (rows == undefined){
			sql =  `INSERT INTO users(username, password) VALUES ('${user}', '${pass}')`;
			db.run(sql);
			}
		}
		else{
			console.log("benutzername existiert bereits");
			res.redirect('/');
		}
		
		sql = `SELECT * FROM users`;
		db.all(sql, function(err, rows){
		if (err){
			console.log(err.message);
		}
		else{
			console.log(rows);
			
		}}); 
	});
}});

let name;
app.post('/test',function(req,res){
	
	const user = req.body['user'];
	name = req.body['user'];
	const pass = req.body['pass'];
	
	let sql = `select * from users where username = '${user}' and password = '${pass}'`;
	db.get(sql,function(error,row){
		if (error){
			console.log(error.message);
		}
		else{
			if (row != undefined){
				req.session['sessionValue'] = Math.floor(Math.random(100)*100);
				console.log(sessionValue);
				console.log("Login sucessfull");
				res.redirect('/willkommen');
			}
			else{
				console.log(error.message);
			}
		}
	});
	
	});
	
	app.get('/willkommen',function(req,res){
		res.render('welcome',{
			name: name
		});
	});