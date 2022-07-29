/**
 * @file This file inside Routes will be used to route to login/logout and Signup for a normal user
 * @see <a href="routes_login_signup.js.html">see the source code Here</a>
 */

const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/login_signup_controller'); //Controller for and Registration authentication
const authenticate = require('../middlewares/authenticate')

//......................Routes for Registration.............................

/**
 * Routing to register.ejs
 * @module normal_user_login_signup
 * @method GET
 */
router.get('/register', authcontrollers.register_get);

/**
 * Routing to register
 * @module normal_user_login_signup
 * @method POST
 */
router.post('/register', authcontrollers.register_post);


//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @module normal_user_login_signup
 * @method GET
 */
router.get('/login', authcontrollers.login_get);
/**
 * Routing to login
 * @module normal_user_login_signup
 * @method POST
 */

router.post('/login', authcontrollers.login_post);

//......................Routes for authenticated user.....................................

router.get('/userDashboard', authenticate, authcontrollers.userDashboard_get);

router.get('/userProfile/:id', authenticate, authcontrollers.showUserProfile_get);


//......................Routes for Like and bookmark.....................................


router.get('/showBlogUser/:slug', authenticate, authcontrollers.showBlogUser_get)

router.put('/like/:id', authenticate, authcontrollers.like);

router.put('/bookmark/:id', authenticate, authcontrollers.bookmark_put);

router.put('/comment/:id' , authenticate , authcontrollers.comment_put);



//......................Routes for User Quiz.....................................


router.put('/saveUserQuizData/data', authenticate, authcontrollers.saveUserQuizData);

router.get('/showUserQuiz/:id', authenticate, authcontrollers.showUserQuiz);

router.get('/userQuizData/:id', authenticate, authcontrollers.userQuizData_get);

router.get('/userQuizResults/:id', authcontrollers.StudentQuizResults_get);

router.get('/userTakeQuiz', authenticate, authcontrollers.userTakeQuiz_get);


//......................Routes for Logout.....................................

/**
 * Routing to logout
 * @module normal_user_login_signup
 * @method GET
 */

router.get('/logout', authenticate, authcontrollers.logout_get);

/**
 * @exports  normal_user_login_signup
 */
module.exports = router;