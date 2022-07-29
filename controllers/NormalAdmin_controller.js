/**
 * @file This file inside Controllers has function definition for normal Admin/Faculty  members functionalities
 */


 const normalAdmin = require('../models/normalAdmin'); //acquiring Schema for admin model
 const bcrypt = require('bcryptjs');
 const Article = require('../models/Blog');
 const Test = require('../models/Test');
const Details = require('../models/userSchema');

 
 
 
 //.....................Implementing Login Part...............................................
 
 
 /**
  * Function to GET request for rendering HTML for login page
  * @module loginAdmin_get
  * @name get/login
  * @param {string} path
  * @param {callback} middleware
  * @param {*} req 
  * @param {login.ejs} res 
  * @exports loginAdmin_get
  */
 exports.loginAdmin_get = (req, res) => {
     res.render('loginNormaladmin');
 }
 
 /**
  * Function to POST request for validating login and if user is verified a response 'ok' will be send to
  * client otherwise a status code '400' will be send to client.
  * @module loginAdmin_post
  * @param {Object} req 
  * @param {Number} res 
  * @param {callback} middleware
  * @returns {number}a status code o '400' when input fields are not filled
  * @async 
  * @exports loginAdmin_post
  */
 
 exports.loginAdmin_post = async(req, res) => {
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
 
         const Adminsearch = await normalAdmin.findOne({ email: email });
 
         if (!Adminsearch) {
             res.status(400).json({ error: "admin not found" });
         } else {
             const isValidlogin = await bcrypt.compare(password, Adminsearch.password);
             const token = await Adminsearch.generateAuthToken();
             // console.log(token); //for testing pupose 
             res.cookie("jwtoken", token, {
                 expires: new Date(Date.now() + 60480000), //expiry data of token set for 1 week
                 httpOnly: true
             });
 
             if (!isValidlogin) {
                 res.status(400).json({ error: "admin not found" });
             } else {
                 console.log('Normal Admin found'); //For testing purpose in backend
                 res.status(200).json({ status: 'normalAdmin' });
             }
         }
 
     } catch (err) {
         console.log(err);
     };
 }
 
 //.....................Implementing Normal Admin Dashboard......................
 
 /**
  * Function to render normal admin  dashboard
  * @module dashboard_get
  * @param {*} req 
  * @param {NormalAdminDashBoard.ejs} res 
  * @exports dashboard_get
  */
 exports.dashboard_get = async(req, res) => {
    const articles = await Article.find();
    const tests = await Test.find();
    console.log("coming to backend to get tests");
    console.log(tests);
     res.render('NormalAdminDashboard',{ articles: articles ,tests:tests ,unauthorised:res.locals.unauthenticated,userID:res.locals.id});
 };
 
 /**
  * Function to get admin details to show in the dashboard
  * @module admin_details_get
  * @param {Object} req 
  * @param {Object} res 
  * @exports admin_details_get
  */
 exports.admin_details_get = (req, res) => {
     res.send(req.verifiedAdmin);
 };
 
 //.....................Implementing Normal Admin Profile......................
 
 /**
  * Function to render normal admin  Profile
  * @module adminProfile_get
  * @param {*} req 
  * @param {NormalAdminDashBoard.ejs} res 
  * @exports adminProfile_get
  */
 exports.adminProfile_get = (req, res) => {
     res.render('NormalAdminProfile');
 }
 
 
 
 
 
 
 
 
 
 
 //.......................blog section Area CRUD operation.........................................
 
 /**
  * Function to render add blog page for adding a blog
  * @module addBlog_get
  * @param {*} req 
  * @param {addblog.ejs} res 
  * @exports addBlog_get
  */
 exports.addBlog_get = (req, res) => {
     res.render('addBlog');
 };
 
 
 
 /**
  * Function to add blog post to the database
  * @module addBlog_post
  * @param {Object} req 
  * @param {Number|Object} res 
  * @returns {Number} status code
  * @exports addBlog_post
  */
 exports.addBlog_post = async(req, res) => {
     console.log("Coming in backend to add blog");
 
     // console.log(req.body)
 
     const createdById = req.AdminId;
     const createdBy = res.locals.user;
     const title = req.body.title;
     const description = req.body.description;
     const blogContent = req.body.blogContent;
     const markdown = req.body.markdown;
 
     // trying to save current user email in during post in articles collection
     // const createdBy = res.locals.Admin;
     // const createdById = res.locals.Admin.id;
 
     // image
     const image = req.files;
     console.log(image, blogContent)
 
     //  category
     const category = req.body.category;
 
     let article = new Article({
         title: title,
         description: description,
         blogContent: blogContent,
         markdown: markdown,
         createdBy: createdBy,
         createdById: createdById,
         image: image,
         category: category
     })
 
     try {
         const articleData = await article.save();
         // console.log(article.id)
         return res.status(201).redirect(`/${articleData.slug}`);
     } catch (error) {
         console.log(error);
         res.status(401).send({ error: "Error Occured, Please try again. " });
     }
 };
 
 
 
 
 
 /**
  * Function to show a particular blog using the slug 
  * @module showBlog_get
  * @param {String} req 
  * @param {Object} res 
  * @exports showBlog_get
  */
 
 exports.showBlog_get = async(req, res) => {
 
     console.log(req.params.slug)
 
     const article = await Article.findOne({ slug: req.params.slug })
 
     if (article == undefined) {
         res.redirect('/')
     } else {
         res.render('showBlog', { article: article })
     }
 };
 
 
 
 /**
  * Function to show all blogs created by a particular admin
  * @module showAllBlogs_get
  * @param {_id} req 
  * @param {Array|Object} res 
  * @async 
  * @exports showAllBlogs_get
  */
 exports.showAllBlogs_get = async(req, res) => {
     const id = req.params.id;
     try {
         const allBlogs = await Article.find({ createdById: id });
         if (allBlogs.length > 0) {
             res.status(200).json(allBlogs);
         } else {
             res.status(404).json({ error: 'No blogs yet' });
         }
     } catch (err) {
         console.log(err);
     }
 };
 
 
 /**
  * Function to Update a blog using the id of the blog
  * @module updateBlog_put
  * @param {_id} req 
  * @param {JSON|Number} res Json Data and status Code 
  * @async 
  * @exports updateBlog_put
  */
 exports.updateBlog_put = async(req, res) => {
     const id = req.params.id;
     console.log(id);
     if (!req.body) {
         res.status(400).send({ message: "Data might not be filled" });
     }
 
     Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
         .then(data => {
             if (!data) {
                 res.status(404).send({ message: "can not update user" });
             } else {
                 res.status(200).send(data);
             }
         }).catch(err => {
             console.log(err);
             res.status(500).send({ message: "can not update data" });
         });
 };
 
 
 /**
  * Function to delete a particular blog using the blog Id
  * @module deleteBlog_delete
  * @param {_id} req 
  * @param {Object} res 
  * @async 
  * @exports deleteBlog_delete
  */
 exports.deleteBlog_delete = async(req, res) => {
     const id = req.params.id;
     Article.findByIdAndDelete(id).then(data => {
         if (!data) {
             res.status(404).send({ message: "can't delete'" });
         } else {
             res.send({ message: "Blog deleted" });
         }
     }).catch(err => {
         res.status(500).send({ message: err });
     })
 };
 
 
 
 
 //.................................Implementing Normal admin Test part.........................
 /**
  * Function to save MCQ test data created by an admin
  * @module saveTest_post
  * @param {Object} req 
  * @param {Number} res Status code 
  * @exports saveTest_post
  */
 exports.saveTest_post = async(req, res) => {
     const createdById = req.params.id;
     const title = req.body.title;
     const noOfQestions = req.body.noOfQestions;
     const questions = req.body.questions;
     console.log(noOfQestions);
     let mcqTest = new Test({
         title,
         noOfQestions,
         createdById,
         questions
     });
 
     try {
         const testData = await mcqTest.save();
         res.status(200).json(testData.slug);
     } catch (err) {
         console.log(err);
     }
 }
 
 
 
 
 
 
 /**
  * Function to render  the test Panel
  * @module testAdmin_get
  * @param {*} req 
  * @param {adminTestPanel.ejs} res 
  * @exports testAdmin_get
  */
 exports.testAdmin_get = (req, res) => {
     res.render('testPanel');
 }
 
 
 /**
  * Function to render mcqTest.ejs File
  * @module testSlug_get
  * @param {*} req 
  * @param {mcqTest.ejs} res 
  * @async
  * @exports testSlug_get
  */
 exports.testSlug_get = async(req, res) => {
     res.locals.slug = req.query.slug;
     res.locals.userID = req.query.userID;
     res.render('mcqTest',{slug:res.locals.slug,userid:res.locals.userID});
 }
 
 
 /**
  * Function to send test data by a particular slug
  * @module testData_get
  * @param {*} req 
  * @param {Number|JSON} res 
  * @async
  * @exports testData_get
  */
 exports.testData_get = async(req, res) => {
     let slug = req.params.slug;
     try {
         const result = await Test.find({ slug: slug });
         if (result.length > 0) {
             console.log(result);
             res.status(200).json(result);
         }
     } catch (err) {
         console.log(err);
         res.status(500).json(err);
     }
 
 }
 
 
 
 exports.allBlogs_get = async(req, res) => {
     try {
         const result = await Article.find({ createdAt: { $gte: new Date("2022-01-15").toISOString(), $lte: new Date("2022-02-30").toISOString() } }).
         populate('createdById');
         if (result) {
             res.status('200').json(result);
         }
     } catch (err) {
         console.log(err);
         res.status(500).json(err);
     }
 }
 
 
 exports.Blog_category_get = async (req,res)=>{
     const category = req.params.category;
     try{
         const result = await Article.find({ category: category}).
         populate('createdById');
         if(result){
             res.status(200).json(result);
         }
     }catch(err){
         console.log(err);
         res.status(500).json(err);
     }
 }
 
 
 exports.Admin_test_get = async (req,res)=>{
     const id = req.params.id;
     try{
         const result = await Test.find({createdById: id});
         if(result.length > 0){
             res.status(200).json(result);
         }
     }catch(err){
         console.log(err);
         res.status(500).json(err);
     }
 }
 
 
 exports.Admin_test_delete= async (req,res)=>{
     const id = req.params.id;
     Test.findByIdAndDelete(id).then(data => {
         if (!data) {
             res.status(404).send({ message: "can't delete'" });
         } else {
             res.send({ message: "Test deleted" });
         }
     }).catch(err => {
         res.status(500).send({ message: err });
     })
 }
 
 exports.logout_normalAdmin=async (req,res)=>{
     res.clearCookie('jwtoken');
     res.status(200).redirect('/login');
 }