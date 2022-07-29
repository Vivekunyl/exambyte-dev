/**
 * @file Home.js inside Routes will be used to route to home page
 * @see <a href="routes_home.js.html">see the source code Here</a>
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/home");
const authenticate = require("../middlewares/authenticate");
const vimeoController = require("../controllers/vimeo_controllers");

router.get("/", authenticate, controller.getHome);

router.get("/getData", authenticate, controller.getData);

router.get("/userTestsSection", controller.getUserTest);

router.get("/allTests", controller.allTests_get);

// videos section routes

router.get("/getfreevideos", vimeoController.get_freeVideos);

router.get("/uploadvideo/info", vimeoController.upload_video);

router.post("/addVimeoVideoData", vimeoController.post_vimeoVideoData);

router.get("/getVimeoCourseData", vimeoController.get_VimeoCourseData);

router.get("/exploreCourse/:id", vimeoController.get_exploreCourse);

router.get("/coursePreview/:id", vimeoController.get_VimeoCoursePreview);

router.get("/exploreSubTopic/:id", vimeoController.get_exploreSubTopic);

router.get("/subTopicVideo/:url",vimeoController.get_subTopicVideo);

router.get('/myCourses/:id',vimeoController.get_myCourses);


// router.put('/like/:id', authenticate, controller.like);

// router.put('/bookmark/:id', authenticate, controller.bookmark_put);

// router.get("/courseFullView", controller.getFullView);

router.get("/payment/:id", controller.getPayment);

router.post("/payment_gateway/payumoney", controller.postPayment);

router.post("/payment/success/:id" , controller.post_paymentSuccess);

router.post("/payment/fail" , controller.post_paymentFail);


// payment for subtopics
router.get("/payment2/:id", controller.getPayment2);

router.post("/payment_gateway2/payumoney", controller.postPayment2);

router.post("/payment2/success/:id" , controller.post_paymentSuccess2);

router.post("/payment2/fail" , controller.post_paymentFail2);



// router.get("/myCourses/:id"  ,authenticate ,controller.get_myCourses);

module.exports = router;
