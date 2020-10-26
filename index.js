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

app.post('/send-message', (req, res) => {

	let transporter = nodemailer.createTransport({
		host: "",
		port: 587,
		secure: false,
		auth: {
			user: Account.username,
			pass: Account.password,
		}
	});

	let mailOptions = {
		from: '"Nodemailer"' + `<${ req.body.Email }>`,
		to: 'office@alb-engineering.com',
		subject: "New Message From Client",
		text: `${ req.body.Message }`
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			return console.log(err);
		}

		res.redirect('/contacts');
	});
});