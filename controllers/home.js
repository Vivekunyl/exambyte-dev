/**
 * @file This file inside controllers has function definitions for home functionality
 */

//Controller for home Routing
const User = require("../models/userSchema");
const authenticate = require("../middlewares/authenticate");
const req = require("express/lib/request");
const Article = require("../models/Blog");
const Details = require("../models/userSchema");
const Test = require("../models/Test");
const jsSHA = require("jssha");
const request = require("request");
const bodyParser = require("body-parser");
const VideoDB = require("../models/video");
const router = require( "../routes/home" );
const Course = require("../models/video")

/**
 * @name get/home
 * @module normal_user_home
 * @param {String} path
 * @param {Callback} middleware
 * @param {*} req
 * @param {home.ejs} res
 * @exports normal_user_home
 */
exports.getHome = async (req, res) => {
  // const {name,email,contactNo,password} = req.verifiedUser;
  // console.log(res.locals.user._id);
  const articles = await Article.find();
  const tests = await Test.find();
  const videoData = await VideoDB.find();
  res.render("home", {
    articles: articles,
    tests: tests,
    unauthorised: res.locals.unauthenticated,
    userID: res.locals.id,
    courses: videoData,
  });
};

exports.getUserTest = async (req, res) => {
  res.render("userTest");
};

exports.allTests_get = async (req, res) => {
  try {
    const tests = await Test.find();
    if (tests.length > 0) {
      res.status(200).json(tests);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getData = async (req, res) => {
  const articles = await Article.find();
  res.render("home", { articles: articles });
  // res.send(req.verifiedUser);
};

// exports.getFullView = async (req, res) => {
//   res.render("courseFullView");
// };

exports.getPayment = async (req, res) => {
  console.log(req.params.id)
  res.render("payment" , {courseId : req.params.id});
};

exports.postPayment = (req, res) => {
  // console.log(req.params.id)
  console.log("post request in payumoney");
  console.log(req.body);
  const pay = req.body;
  
  // program to generate random strings

  // declare all characters
  const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  pay.txnid = generateString(14);

  const hashString =
    "rUBT9u" + // merchant key
    "|" +
    pay.txnid +
    "|" +
    pay.amount +
    "|" +
    pay.productinfo +
    "|" +
    pay.firstname +
    "|" +
    pay.email +
    "|" +
    "||||||||||" +
    "xWcdyfWT"; //merchant salt
  const sha = new jsSHA("SHA-512", "TEXT");
  sha.update(hashString);
  //Getting hashed value from sha module

  const hash = sha.getHash("HEX");

  //We have to additionally pass merchant key to API so remember to include it.
  pay.key = "rUBT9u"; //store in in different file;
  pay.surl = `http://localhost:2000/payment/success/${req.body.courseId}`;
  pay.furl = "http://localhost:2000/payment/fail";
  pay.hash = hash;
  //Making an HTTP/HTTPS call with request
  // console.log(pay);

  request.post(
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "https://secure.payu.in/_payment", //production url
      form: pay,
    },
    function (error, httpRes, body) {
      if (error) res.send({ status: false, message: error.toString() });
      if (httpRes.statusCode === 200) {
        res.send(body);
      } else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
        res.redirect(httpRes.headers.location.toString());
      }
    }
  );
};

exports.post_paymentSuccess = async (req,res)  =>{
  console.log(req.body.email)
  console.log(req.params.id);
  const user = await Details.findOne({ email: req.body.email });
  // user.check = "true";
  const courseDB = await Course.findOne({subject_id : req.params.id});
  let newCourse = {course : courseDB.subjectName , coursePayment : true, course_id : req.params.id};
  user.courses.push(newCourse);
  user.save();
  res.render("success.ejs");
}

exports.post_paymentFail = async (req,res) =>{
  window.alert("payment failed");
  res.render("home");
}



// subtopic payment part

exports.getPayment2 = async (req, res) => {
  console.log(req.params.id)
  res.render("paymentSubtopic" , {courseId : req.params.id});
};

exports.postPayment2 = (req, res) => {
  // console.log(req.params.id)
  console.log("post request in payumoney");
  console.log(req.body);
  const pay = req.body;
  
  // program to generate random strings

  // declare all characters
  const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  pay.txnid = generateString(14);

  const hashString =
    "rUBT9u" + // merchant key
    "|" +
    pay.txnid +
    "|" +
    pay.amount +
    "|" +
    pay.productinfo +
    "|" +
    pay.firstname +
    "|" +
    pay.email +
    "|" +
    "||||||||||" +
    "xWcdyfWT"; //merchant salt
  const sha = new jsSHA("SHA-512", "TEXT");
  sha.update(hashString);
  //Getting hashed value from sha module

  const hash = sha.getHash("HEX");

  //We have to additionally pass merchant key to API so remember to include it.
  pay.key = "rUBT9u"; //store in in different file;
  pay.surl = `http://localhost:2000/payment2/success/${req.body.courseId}`;
  pay.furl = "http://localhost:2000/payment2/fail";
  pay.hash = hash;
  //Making an HTTP/HTTPS call with request
  // console.log(pay);

  request.post(
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "https://secure.payu.in/_payment", //production url
      form: pay,
    },
    function (error, httpRes, body) {
      if (error) res.send({ status: false, message: error.toString() });
      if (httpRes.statusCode === 200) {
        res.send(body);
      } else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
        res.redirect(httpRes.headers.location.toString());
      }
    }
  );
};



exports.post_paymentSuccess2 = async (req,res)  => {

  function getSubjectId(id){
    let subjId = "";

    var plusC = 1;
    for(var i=0;i<id.length;i++){
      if(id[i] == " "){
        return subjId;
      }
      subjId += id[i];
    }
  }
  
  function getTopicId(id){
    let topicId = "";
    let subtopicId = "";
    var flag = 0;
    for(var i=0;i<id.length;i++){
      if(id[i] == " "){
        flag += 1;
      }
      else if(flag == 1){
        topicId += id[i];
      }
    }
    return topicId;
  }

  function getSubTopicId(id){
    let topicId = "";
    let subtopicId = "";
    var flag = 0;
    for(var i=0;i<id.length;i++){
      if(id[i] == " "){
        flag += 1;
      }
      else if(flag == 2){
        subtopicId += id[i];
      }
      
    }
    return subtopicId;
  }

  let tid = getTopicId(req.params.id);
  let sid = getSubTopicId(req.params.id);
  let subid = getSubjectId(req.params.id);
  console.log(tid)
  console.log(sid);
  console.log(subid);

  let Alltopics = await Course.find({subject_id : subid});
  console.log(Alltopics)
  Alltopics.forEach(element => {
    if(element.topic_Id == tid){
      console.log(element.topicName)
      element.subTopics.forEach(element2 => {
        if(element2.subTopic_id == sid){
          element2.check = "true";
          return;
        }
      });
    }
  });
  // await Alltopics.save();
  console.log("success")
  
  res.render("success.ejs");
}

exports.post_paymentFail2 = async (req,res) =>{
  window.alert("payment failed");
  res.render("home");
}

