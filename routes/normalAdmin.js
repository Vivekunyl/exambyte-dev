/**
 * @file This file inside Routes will be used to route to normal Admin/faculty member to route to different Functionalities such as Login faculty member , Create a blog , create a MCQ test and can see other Admin Blogs.
 * @see <a href="routes_normalAdmin.js.html">see the source code Here</a>
 */


const express = require('express');
const router = express.Router();
const normalAdminControllers = require('../controllers/NormalAdmin_controller'); //Controller for and Registration authentication
const authenticate = require('../middlewares/authenticateAdmin');
const multer = require('../middlewares/multer');



router.get('/logoutNormalAdmin', authenticate, normalAdminControllers.logout_normalAdmin);

router.get('/getAllBlogs', authenticate, normalAdminControllers.allBlogs_get);

router.get('/categoryBlog/:category', normalAdminControllers.Blog_category_get);

router.get('/getAdminTest/:id', normalAdminControllers.Admin_test_get);

router.delete('/deleteTest/:id', normalAdminControllers.Admin_test_delete);


//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @module normal_admin_router
 * @method GET
 */
router.get('/loginNormalAdmin', normalAdminControllers.loginAdmin_get);

/**
 * Routing to login
 * @module normal_admin_router
 * @method POST
 */

router.post('/loginNormalAdmin', normalAdminControllers.loginAdmin_post);

//......................Routes for Normal admin Panel.....................................

/**
 * Route to get normal admin Panel
 * @module normal_admin_router
 * @method GET
 */
router.get('/NormalAdminDashboard', authenticate, normalAdminControllers.dashboard_get);

/**
 * Route to get Normal admin Details
 * @module normal_admin_router
 * @method GET
 */
router.get('/getNormalAdminDetails', authenticate, normalAdminControllers.admin_details_get);

//......................Routes for Normal admin Profile.....................................


/**
 * Route to get normal admin Panel
 * @module normal_admin_router
 * @method GET
 */
router.get('/NormalAdminProfile', authenticate, normalAdminControllers.adminProfile_get);




//......................Routes for CRUD operation of Blogs.....................................


/**
 * Route to get add blog panel
 * @module normal_admin_router
 * @method GET
 */
router.get('/addBlog/:id', authenticate, normalAdminControllers.addBlog_get);

/**
 * Route to post blog data of a normal Admin
 * @module normal_admin_router
 * @method POST
 */

router.post('/addBlog/:id', authenticate, multer.array('file'), normalAdminControllers.addBlog_post);

/**
 * route to get a particular blog a normal Admin
 * @module normal_admin_router
 * @method GET
 */

router.get(`/:slug`, authenticate, normalAdminControllers.showBlog_get);

/**
 * Route to get all blogs of admin
 * @module normal_admin_router
 * @method GET
 */
router.get('/showAdminAllBlogs/:id', authenticate, normalAdminControllers.showAllBlogs_get);

/**
 * Route to put admin blo details for updating
 * @module normal_admin_router
 * @method PUT
 */

router.put('/updateBlog/:id', authenticate, normalAdminControllers.updateBlog_put);

/**
 * Route to delete a particular blog of an admin using the id of the particular blog
 * @module normal_admin_router
 * @method DELETE
 */
router.delete('/deleteBlog/:id', authenticate, normalAdminControllers.deleteBlog_delete);






/**
 * @exports normal_admin_router
 */
module.exports = router;