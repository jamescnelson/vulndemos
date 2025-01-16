// app.js for idempotency safety to resolve basic csrf

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve public/* staticly
// app.use(express.static('public'));

// cookie parser middlware
app.use(cookieParser());


// email storage for demo of POC
var email = 'user@domain.com';


// GET index and print email:
app.get('/', (req,res) => {
        res.set('Cache-Control', 'no-cache');
    
    // set email query string
    const qemail = req.query.email || email;

    res.send(`
        <p>Hi ${qemail}</p>
        <p>your email is ${qemail}</p>
        
        `);
    console.log('Profile :', qemail);     // do i use +var only for string concat?
})

// GET method to retrieve email (idempotent) safe
app.get('/profile/', (req, res) => {
    res.set('Cache-Control', 'no-cache');
    //console.log("GET /profile - (idempotent) Returning email");
    //res.json({ email });
    res.send("<p>Your email is: " +email+"</p>");

});

// update-email route: GET method to retrieve email not safe
app.get('/update-email/', (req, res) => {
    res.set('Cache-Control', 'no-cache');
    let newEmail = req.query.email;   // email is passedin query string
    if (!newEmail) {
        return res.status(400).send('<p>Email is required to update.</p>');
        
        // return a json kvp 
        //return res.status(400).json({ message: 'Email is required to update' });
    }

    res.send(`
        <p>Your old email address was: ${email}</p>
        <p>Your new email address is: ${newEmail}</p>
        `)
    //res.send("<p>Your old email address was: " +email+"</p>");
    //res.send("<p>Your new email address is: " +newEmail+"</p>");

    //console.log( `GET /update-email - unsafe not idempotent changing email to: ${newEmail}` );

    

});


// CSRF route (vulnerable) * FINISH LATER *
app.post('/change-email-csrf', (req, res) => {
    
})


// POST method to update email (non-idempotent) sanitized.

// code missing here

// ###############################
// # CODE HERE IS FOR PYTHON POC
// ###############################
// set-cookie for python POC

app.get('/set-cookie', (req, res) => {
    // actually set cookie
    res.cookie('userid','0A123');

    //console.log("response cookies: " +res.cookie);

    res.status(200).send('Response Sent!');
    //res.status(404).send('HTTP 400: Page Not FOund');

    // print cookie to console
    console.log("request cookies (if any): " +req.cookies);

    //
});



// LAUNCH SERVER PORT 3000

app.listen(port, ()=> {
    console.log(`Server running on http://localhost:${port}`);
});