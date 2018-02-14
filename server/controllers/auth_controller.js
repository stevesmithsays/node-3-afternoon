// This controller is responsible for logging in users, registering users, signing out users, and retrieving user info.

const users = require('../models/users');
// ** We'll use this variable to assign ids to newly registered users and then increment it by one so no users have the same id.
let id = 1;

module.exports = {
    login: ( req, res, next ) => {
        const { session } = req;
        const { username, password } = req.body;
      
        const user = users.find( user => user.username === username && user.password === password );
      
        if ( user ) {
          session.user.username = user.username;
          res.status(200).send(session.user);
        } else {
          res.status(500).send('Unauthorized.');
        }
      },

    register: ( req, res, next) => {
        const { session } = req;
        const { username, password } = req.body;

        users.push({id, username, password });
        id++;
        session.user.username = username;

        res.status(200).send( session.user );
    },
    
    signout: ( req, res, next) => {
        const {session } = req;
        res.status(200).send( session.user );
    },

    getUser: ( req, res, next) => {
        const { session } = req;
        res.status(200).send ( session.user );
    }
}