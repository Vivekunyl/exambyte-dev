/**
 * @requires jsonwebtoken
 */
const jwt = require('jsonwebtoken');

const normalAdmin = require('../models/normalAdmin');


const normalAdminauthenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const verifiedAdmin = await normalAdmin.findOne({ _id: verifyToken._id, 'tokens?.token': token });

        if (!verifiedAdmin) { throw new Error(`Could not find Admin`) }

        req.token = token;
        req.AdminId = verifiedAdmin._id;
        req.Admin = verifiedAdmin
        res.locals.user = verifiedAdmin

        next();

    } catch (err) {
        console.log(err);
        res.status(401).send('Unauthorised');

    }
}

/**
 * @exports Adminauthenticate
 */

module.exports = normalAdminauthenticate;