// Export a function that has req, res, next parameter.
// Then check if the req.session has a user object.
// If it doesn't exist, add a user object to the session. This object should default to: { username: '', cart: [], total: 0 }. 
// Call next after the if statement so the request can reach the endpoint.

module.exports = function(req, res, next){
    const{ session } = req;
    if ( !session.user ){
        session.user = { username: '', cart: [], total: 0 };
    }
    next ();
};