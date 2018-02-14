//  *** Install your packages *** //
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
        
// Middleware

const checkForSession = require ('./middlewares/checkForSession.js');

// Controllers here
const auth_controller = require ('./controllers/auth_controller.js');
const swag_controller = require( './controllers/swag_controller.js');
const cart_controller = require( './controllers/cart_controller.js');
const search_controller = require( './controllers/search_controller.js');
// invoking express
const app = express();

app.use(bodyParser.json() );
app.use (
     session ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
}));

app.use( checkForSession );
app.use( express.static( `${__dirname}/build` ) );


//  Get swag
app.get( '/api/swag', swag_controller.read );
app.get('/api/search', search_controller.read);

// Authorization
app.post( '/api/swag', swag_controller.read );
app.post( '/api/register', auth_controller.register);
app.post( '/api/signout', auth_controller.signout );
app.get( '/api/user', auth_controller.getUser );
// req method, url, controller-method

// Cart
app.post( '/api/cart', cart_controller.add );
app.post( '/api/cart', cart_controller.checkout);
app.delete( '/api/cart', cart_controller.delete );



// *** set up application to listen on port 3000.
const port = process.env.PORT || 3001
app.listen( port, () => {console.log(`Server listening port ${port}.`);} );

//  Next, add middleware that will check to see if a session has been created.
// If a session hasn't been made yet we will create a user object that keeps track of a user's username, cart, and total.
// *** To do this, create a folder called middlewares in server *** //
