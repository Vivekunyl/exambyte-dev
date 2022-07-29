const vimeo = require("vimeo").Vimeo;
const env = require("dotenv");
const axios = require("axios");
const vimeoDB = require("../models/video");
const User = require("../models/userSchema");

env.config({ path: "../config.env" });

env.config({ path: "../config.env" });

exports.get_freeVideos = (req, res) => {
  // console.log(process.env.CLIENT_ID);
  // console.log("coming here");

  let client = new vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );

  client.request(
    {
      method: "GET",
      path: "/me/projects/10697891/videos",
    },
    function (error, body, status_code, headers) {
      if (error) {
        console.log(error);
      }
      // console.log(body);
      let data = [];
      body.data.forEach((element) => {
        data.push({ element });
      });
      // console.log(body);
      res.status(status_code).json(data);
    }
  );
};

exports.upload_video = (req, res) => {
  let file_name = req.query.path;
  const description = req.query.description;
  const name = req.query.name;
  // console.log(file_name, description, name);
  let client = new vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );
  client.upload(
    file_name,
    {
      name: name,
      description: description,
    },
    function (uri) {
      console.log("Your video URI is: " + uri);
    },
    function (bytes_uploaded, bytes_total) {
      var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
      console.log(bytes_uploaded, bytes_total, percentage + "%");
    },
    function (error) {
      console.log("Failed because: " + error);
    }
  );
};

exports.showVideoByFolder = (req, res) => {
  let project_id = 0;
  let className = req.query.class;
  let subjectName = req.query.subject;
  if (className == "11" && subjectName == "chemistry") {
    project_id = 10695841;
  } else if (className == "11" && subjectName == "physics") {
    project_id = 10695811;
  } else if (className == "11" && subjectName == "mathematics") {
    project_id = 10695824;
  } else if (className == "12" && subjectName == "chemistry") {
    project_id = 10695601;
  } else if (className == "12" && subjectName == "physics") {
    project_id = 10695605;
  } else if (className == "12" && subjectName == "chemistry") {
    project_id = 10695786;
  } else {
    res.status(404).send({ error: "No data found" });
  }

  let client = new vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );
  client.request(
    {
      method: "GET",
      path: `/me/projects/${project_id}/videos`,
    },
    function (error, body, status_code, headers) {
      if (error) {
        console.log(error);
      }
      // console.log(body.data);
      let data = [];
      body.data.forEach((element) => {
        data.push({ element });
      });
      res.status(200).json(data);
    }
  );
};

exports.post_vimeoVideoData = async (req, res) => {
  const reqData = req.body[0];
  console.log(reqData);
  const vimeoData = new vimeoDB(reqData);
  try {
    const data = await vimeoData.save();
    if (data) {
      console.log(data);
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.get_VimeoCourseData = async (req, res) => {
  try {
    const data = await vimeoDB.find();
    if (data) {
      console.log(data);
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.get_exploreCourse = async (req, res) => {
  const id = req.params.id;
  const vimeoData = await vimeoDB.findOne({ subject_id: id });
  res.render("exploreCourse", { courses: vimeoData });
};

exports.get_VimeoCoursePreview = async (req, res) => {
  const id = req.params.id;
  let project_id = 0;
  let subjectName = "";
  let client = new vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );
  try {
    const data = await vimeoDB.findOne({ subject_id: id });
    if (data) {
      project_id = data.freeTopics.freeTopic[0].freeTopic_id;
      subjectName = data.subjectName;
    }
  } catch (err) {
    console.log(err);
  }
  client.request(
    {
      method: "GET",
      path: `/me/projects/${project_id}/videos`,
    },
    function (error, body, status_code, headers) {
      if (error) {
        console.log(error);
      }
      console.log(body);
      let data = [];
      body.data.forEach((element) => {
        data.push({
          name: element.name,
          description: element.description,
          url: element.player_embed_url,
          duration: element.duration,
        });
      });
      console.log(data);
      res.render("coursePreview", { course: subjectName, videoData: data });
    }
  );
};

exports.get_exploreSubTopic = async (req, res) => {
  const project_id = req.params.id;
  let client = new vimeo(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
  );
  console.log(project_id);
  client.request(
    {
      method: "GET",
      path: `/me/projects/${project_id}/videos`,
    },
    function (error, body, status_code, headers) {
      if (error) {
        console.log(error);
      }
      console.log(body.data);
      let data = [];
      body.data.forEach((element) => {
        data.push({
          name: element.name,
          description: element.description,
          url: element.player_embed_url,
          duration: element.duration,
        });
      });
      console.log(data);
      res.render("exploreSubTopic", { videoData: data });
    }
  );
};



exports.get_subTopicVideo = async(req, res) => {
   const url = req.query.url;
   const name = req.query.name;
   console.log(name);
   res.render("subTopicVideo", {url:url,name:name});
}


exports.get_myCourses = async (req,res)=>{
  console.log("coming in this section");
  const id = req.params.id;
  try{
    const data = await User.findById(id);
    if(data){
      res.render('myCourses',{courses:data.courses});
    }
  }catch(error){
    console.log(error);
  }
}