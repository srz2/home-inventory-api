const config = require('../config');

module.exports = function isAuthorized(req, res, next) {
    // Throw error if no api_key is set
    if (config.API_KEY === undefined) {
        res.status(500).json({
            message: 'Incorrectly configured api_key'
        })
    } else {
        const givenKey = req.get('api_key');
        if (givenKey === config.API_KEY){
            next();
        } else {
            res.status(401).json({
                message: 'Unauthorized access'
            })
        }
    }
};
