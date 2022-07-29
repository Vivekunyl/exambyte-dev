/**
 * @file This file contains mongoDB schema for Normal Admin/faculty members .
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
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Mongoose Schema for Admin User
 */
const normalAdminSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    password: {
        type: String,
        require: true
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "Article"
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    collection: 'NORMALADMINDATA'
});







//Hashing the password
/**
 * @params {method}
 * @async
 */
normalAdminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


//generating Token

normalAdminSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}


const normalAdmin = mongoose.model('NORMALADMINDATA', normalAdminSchema);
// /**
//  * @exports {mongoose.model}
//  */
module.exports = normalAdmin;