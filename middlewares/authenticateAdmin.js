/**
 * @requires jsonwebtoken
 */
const jwt = require('jsonwebtoken');

const Admin = require('../models/normalAdmin');

// this file is used in other files import export so keep this file and delete its duplicate

const Adminauthenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const verifiedAdmin = await Admin.findOne({ _id: verifyToken._id, 'tokens?.token': token });

        if (!verifiedAdmin) { throw new Error(`Could not find Admin`); }
        
        console.log(verifiedAdmin);
        req.verifiedAdmin = verifiedAdmin;
        req.userId = verifiedAdmin._id;
        res.locals.user = verifiedAdmin;
        res.locals.unauthenticated = false;
        res.locals.id = verifiedAdmin._id;
        next();
    } catch (err) {
        res.locals.unauthenticated = true;
        res.locals.id = null;
        // res.redirect('/login');
        next();
        console.log(err);
    }
}

/**
 * @exports Adminauthenticate
 */

module.exports = Adminauthenticate;