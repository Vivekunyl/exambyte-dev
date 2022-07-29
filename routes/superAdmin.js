/**
 * @file This file inside Routes will be used to route to Super Admin to route to different Functionalities such as Login/logout and signup for a super admin , add a faculty member , delete a faculty member.
 * @see <a href="routes_superAdmin.js.html">see the source code Here</a>
 */

const express = require("express");
const router = express.Router();
const superAdminControllers = require("../controllers/SuperAdmin_controller"); //Controller for and Registration authentication
const authenticate = require("../middlewares/authenticateSuperAdmin");

//......................Routes for Super Admin.............................

/**
 * Routing to register.ejs
 * @module super_Admin_Routes
 * @method GET
 */
router.get("/registerSuperAdmin", superAdminControllers.register_get);

/**
 * Routing to register
 * @module super_Admin_Routes
 * @method POST
 */
router.post("/registerSuperAdmin", superAdminControllers.register_post);

//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @module super_Admin_Routes
 * @method GET
 */
router.get("/loginSuperAdmin", superAdminControllers.login_get);
/**
 * Routing to login
 * @module super_Admin_Routes
 * @method POST
 */
router.post("/loginSuperAdmin", superAdminControllers.login_post);

//......................Route for Super Admin Panel.....................................

/**
 * Route for getting Super admin Panel
 * @module super_Admin_Routes
 * @method GET
 */
router.get("/adminPanel", authenticate, superAdminControllers.get_admin_panel);

/**
 * route to get Super Admin Details
 * @module super_Admin_Routes
 * @method GET
 */
router.get("/getAdminData", authenticate, superAdminControllers.get_admin_data);

//......................Routes for CRUD operations for admins.....................................

/**
 * route to post details of normal admin for creating a normal admin user
 * @module super_Admin_Routes
 * @method POST
 */
router.post("/createAdmin", superAdminControllers.create_admin);

/**
 * Route to get all Normal Admins present
 * @module super_Admin_Routes
 * @method GET
 */

router.get("/getAllData", superAdminControllers.getAllDocuments);

/**
 * Route to get edit admin data by ID
 * @module super_Admin_Routes
 * @method GET
 */
router.get("/editAdmin/:id", superAdminControllers.edit_admin_data_get);

/**
 * Route to put admin information or updating the data byusing ID
 * @module super_Admin_Routes
 * @method PUT
 */
router.put("/updateAdmin/:id", superAdminControllers.update_admin_data_put);

/**
 * Route to delete a particular admin by his/her ID
 * @module super_Admin_Routes
 * @method DELETE
 */
router.delete("/deleteAdmin/:id", superAdminControllers.delete_admin_data);

// Routes for Controlling Video
router.get('/vimeoController',superAdminControllers.get_vimeoControl);

router.post('/postFacultyData',superAdminControllers.post_facultyData);




//......................Routes for Logout.....................................

/**
 * Routing to logout
 * @module super_Admin_Routes
 * @method GET
 */
router.get("/logoutSuperAdmin", superAdminControllers.adminLogout_get);

/**
 * @exports super_Admin_Routes
 */
module.exports = router;
