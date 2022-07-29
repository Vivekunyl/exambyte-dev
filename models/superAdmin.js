/**
 * @file This file contains MongoDB Schema for Super Admin 
 */


/**
 * @imports module
 * @const
 */
const mongoose = require('mongoose');
/**
 * @imports module
 * @const
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Mongoose Schema for User
 */
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contactNo: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'superAdmin'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    collection: 'SUPERADMINDATA'
});



//Hashing the password
/**
 * @params {method}
 * @async
 */
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


//generating Token

adminSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}


const admin = mongoose.model('SUPERADMINDATA', adminSchema);
// /**
//  * @exports {mongoose.model}
//  */
module.exports = admin;