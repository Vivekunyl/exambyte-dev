/**
 * @file This file inside Routes will be used to route a normal Admin/faculty member to create a test and share the test.
 * @see <a href="routes_test.js.html">see the source code Here</a>
 */


 const express = require('express');
 const router = express.Router();
 const normalAdminControllers = require('../controllers/NormalAdmin_controller'); //Controller for and Registration authentication
 const authenticate = require('../middlewares/authenticateAdmin');
 
 
 
 //.............................Routes for creating test..................................
 
 /**
  * route to GET test  panel for an admin
  * @module test_module
  * @method GET
  */
  router.get('/test/admin', normalAdminControllers.testAdmin_get);
 
  /**
   * Route to GET mcq test
   * @module test_module
   * @method GET
   */
  router.get('/mcq/Quiz', normalAdminControllers.testSlug_get);
  
  /**
   * Route to GET mcq test data
   * @module test_module
   * @method GET
   */
  router.get('/getTestData/:slug', normalAdminControllers.testData_get); 
 
 
 
 /**
  * Route to save a test
  * @module test_module
  * @method POST
  */
  router.post('/saveTest/:id', normalAdminControllers.saveTest_post);
 

 
 /**
  * @exports test_module
  */
  module.exports = router;