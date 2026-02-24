const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// figure out the session cookies for a friggin alert(document.cookie) stop sucking at this.
const session = require('express-session');
const path = require('path');

const app = express();
const port = 9996;

// body-parser midware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie-parser midware
app.use(cookieParser());

// server static files
app.use(express.static(path.join(__dirname, 'public')));

let tickets = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.cookie('user', 'FooBar', )
    res.render('customer', { title: 'Submit a support ticket' });
});

app.post('/submit-ticket', (req, res) => {
    const { name, email, issue } = req.body;

    // simulate ticket storage with a poss XSS attack
    tickets.push({ name, email, issue });

    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) =>{
    res.render('dashboard', { title: 'Employee Dashboard', tickets});
});

// start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:$(port)`);
});