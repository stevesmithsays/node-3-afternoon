const swag = require('../models/swag');

module.exports = {
    read: () => {
        res.status(200).send( swag );
    }
};