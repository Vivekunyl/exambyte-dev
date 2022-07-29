/**
 * @file This file inside Controllers has function definition for login and signup of a normal users
 */



const User = require('../models/userSchema'); //acquiring Schema for user model
const Test = require('../models/Test');
const bcrypt = require('bcryptjs');
const Article = require('../models/Blog');
const Details = require('../models/userSchema');
const normalAdmin = require('../models/normalAdmin');

//....................Implementing Signup Part..............................................


/**
 * Function to GET request for rendering HTML for Signup page
 * @module register_normal_user_get
 * @name get/register
 * @param {String} path
 * @param {callback} middleware
 * @param {*} req 
 * @param {register.ejs} res 
 * @exports register_normal_user_get
 */
exports.register_get = (req, res) => {
    res.render('register');
}


/**
 * Function to POST request for Register if userregistered successfully server will send of status code 201
 * else a status code of 404 will be send
 * @module register_normal_user_post
 * @param {Object} req 
 * @param {Number} res 
 * @returns {Number} status code
 * @async
 * @exports register_normal_user_post
 */
exports.register_post = async(req, res) => {

    const { name, email, contactNo, password, confirm_password } = req.body;
    if (!name || !email || !contactNo || !password || !confirm_password) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    } else if (password.length < 6) {
        return res.status(401).json({ error: "Password must be at least 6 characters" })
    }

    try {
        /**
         Searching if a user already exist with the email
        */
        const dbEmail = await User.findOne({ email: email });
        if (dbEmail) {
            return res.status(404).json({ error: 'Email Already Registered' })
        }

        if (password === confirm_password) {

            const detail = new User({
                name,
                email,
                contactNo,
                password
            });

            console.log(detail) //For testing purpose
            const registered = await detail.save();

            if (registered) {
                res.status(201).json({ registered: registered._id });
            } else {
                res.status(500).json({ error: "User Failed to Register" });
            }

        } else {
            res.status(404).json({ error: 'Enter same confirm password' })
        }
    } catch (error) {
        res.status(404).json({ error: error });
    }
}






//.....................Implementing Login Part...............................................


/**
 * Function to GET request for rendering HTML for login page
 * @module normal_user_login_get
 * @name get/login
 * @param {string} path
 * @param {callback} middleware
 * @param {*} req 
 * @param {login.ejs} res 
 * @exports normal_user_login_get
 */

exports.login_get = (req, res) => {
    res.render('login');
}


/**
 * Function to POST request for validating login and if user is verified a response 'ok' will be send to
 * client otherwise a status code '400' will be send to client.
 * @module normal_user_login_post
 * @param {Object} req 
 * @param {Number} res 
 * @param {callback} middleware
 * @returns {number}a status code o '400' when input fields are not filled
 * @async 
 * @exports normal_admin_login_post
 */
exports.login_post = async(req, res) => {
    try {
        /**
         * object destructuring to get email and password from client
         */
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }
        /**
         * Storing user data if user exists in database 
         */
        const validateUser = await User.findOne({ email: email });
        const validateNormalAdmin = await normalAdmin.findOne({ email: email });
        if (validateUser) {
            const isValidlogin = await bcrypt.compare(password, validateUser.password);
            const token = await validateUser.generateAuthToken();
            console.log(token); //for testing pupose 
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 60480000), //expiry data of token set for 1 week
                httpOnly: true
            });

            if (!isValidlogin) {
                res.status(400).json({ error: "User not found" });
            } else {
                console.log('user found'); //For testing purpose in backend
                res.json({ status: 'okUser' });
            }
        } else if (validateNormalAdmin) {
            console.log(validateNormalAdmin);
            const isValidlogin = await bcrypt.compare(password, validateNormalAdmin.password);
            const token = await validateNormalAdmin.generateAuthToken();
            console.log(token); //for testing pupose 
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 60480000), //expiry data of token set for 1 week
                httpOnly: true
            });

            if (!isValidlogin) {
                res.status(400).json({ error: "User not found" });
            } else {
                console.log('user found'); //For testing purpose in backend
                res.json({ status: 'okAdmin' });
            }
        } else {
            res.status(400).json({ error: "User not found" });
        }

    } catch (err) {
        console.log(err);
    };
}

//.....................Implementing Logout Part...............................................

/**
 * GET request to logout the user
 * @module normal_user_logout_get
 * @param {*} req 
 * @param {Number} res 
 * @exports normal_user_logout_get
 */
exports.logout_get = (req, res) => {
    res.clearCookie('jwtoken');
    res.status(200).redirect('/login');
}



// for likes 
exports.like = async(req, res) => {

    try {
        const post = await Article.findById(req.params.id);

        // check if post already been liked
        if (post.likes.includes(res.locals.user._id)) {

            post.likes.pull(res.locals.user._id)

            await post.save();

            return res.status(400).json({ "msg": 'Disliked' })
        } else {

            post.likes.push(res.locals.user._id);

            await post.save();
            return res.json({ "msg": 'Liked' });
        }
    } catch (error) {
        // console.log(error.message);
        return res.status(500).json({ "msg": error.message });
    }
}


// bookmarks for user

module.exports.bookmark_put = async(req, res) => {

    //  console.log('request received')
    try {
        const user = await Details.findById(res.locals.user._id);

        // check if post already been liked
        if (user.bookmarks.includes(req.params.id)) {

            user.bookmarks.pull(req.params.id)
            await user.save();

            return res.status(400).json({ "msg": 'Unsaved' })
        } else {

            user.bookmarks.push(req.params.id);

            await user.save();
            return res.json({ "msg": 'Saved' });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ 'err': error.message });
    }
}

// comments for blog

module.exports.comment_put = async(req, res) => {
    // console.log(100)
    const comment_ = {
        text: req.body.data,
        createdBy: res.locals.user._id,
        createdByName: res.locals.user.name,
        createdAt: Date.now()
    }

    try {
        const post = await Article.findById(req.params.id);

        post.comments.push(comment_)

        await post.save();

        return res.json({ "msg": 'commeted success' });
    } catch (error) {
        // console.log(error.message);
        return res.status(500).json({ "msg": error.message });
    }
}



// showBlog
// exports.showBlog_get = async(req, res) => {

//     // console.log(req.params.id)
//     console.log('request received in backend')

//     const article = await Article.findOne({ id: req.params.id })
//     if (article == undefined) {
//         res.redirect('/')
//     } else {
//         return res.status(200).send({ 'article': article })
//     }
// }

exports.showBlogUser_get = async(req, res) => {

    // console.log(req.params.slug)

    const article = await Article.findOne({ slug: req.params.slug })

    if (article == undefined) {
        res.redirect('/')
    } else {
        res.render('showBlog', { article: article })
    }
}


exports.showUserQuiz = async(req, res) => {
    const id = req.params.id;
    try {
        const quizes = await User.find({ _id: id }).
        populate('tests');
        if (quizes.length > 0) {
            console.log(quizes);
        }
    } catch (err) {
        copnsole.log(err);
    }
}


exports.saveUserQuizData = async(req, res) => {
    const id = req.query.userID;
    const { tests, points } = req.body;
    console.log(tests);
    try {
        const data = await User.findByIdAndUpdate(id, { $push: { tests: tests }, $inc: { points: points } }, { useFindAndModify: false });
        console.log(data);
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json('Database Error');
    }
}



exports.userDashboard_get = async(req, res) => {
    res.render('studentDashboard', { userID: res.locals.id });
}


exports.userQuizData_get = async(req, res) => {
    const id = req.params.id;
    try {
        const data = await User.findById(id).
        populate({ path: 'tests', populate: { path: 'test' } }).exec();

        if (data) {
            res.status(200).json({ userQuizes: data.tests, userPoints: data.points, userId: data._id });
        }
    } catch (err) {
        console.log(err);
    }
}


exports.showUserProfile_get = async(req, res) => {
    const id = req.params.id;
    console.log(res.locals.user);
    res.render('userProfile', { userData: res.locals.user });
}
exports.StudentQuizResults_get = async(req, res) => {
    const id = req.params.id;
    console.log("coming to backend");
    res.render('userQuizResults', { UserID: id });
}

exports.userTakeQuiz_get = async(req, res) => {
    res.render('userTakeQuiz');
}