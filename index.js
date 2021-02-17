const bodyParser = require('body-parser');
const express = require('express');
const path = require ('path');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static(path.join(__dirname, 'UI Kit', 'CSS'))); // Serve The CSS
app.use(express.static(path.join(__dirname, 'UI Kit', 'JS'))); // Serve The JS
app.use(express.static(path.join(__dirname, 'views'))); // Serve The Views
app.use(express.static(path.join(__dirname, 'views/Images'))); // Serve The Images
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(bodyParser.json());

app.listen(3000);

app.set('view engine', 'ejs'); // Set EJS View Engine

app.get('/', (_, res) => {
	res.render('index');
});

app.get('/projects', (_, res) => {
	res.render('projects');
});

app.get('/about', (_, res) => {
	res.render('about');
});

app.get('/contacts', (_, res) => {
	res.render('contacts');
});

app.get('/zohoverify/verifyforzoho.html', (_, res) => {
	res.writeHeader(200, {"Content-Type": "text/html"});  
	res.write('83844438');  
	res.end();  
});

app.post('/send-message', (req, res) => {

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'noreplyalbengineering@gmail.com',
			pass: 'Sashowebsite'
		}
	});

	let mailOptions = {
		from: '"alb-engineering"' + `<${ req.body.Email }>`,
		to: 'Aleksander.bozhinov@gmail.com',
		// to: 'djilanov@gmail.com',
		subject: `New Message From ${req.body.Name}`,
		text: `
		Email: ${req.body.Email}
		Name: ${req.body.Name}
		Message: ${ req.body.Message }
		`
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			res.redirect('/contacts?success=false');
			return console.log(err);
		}

		res.redirect('/contacts?success=true');
	});
});