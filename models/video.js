const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoschema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
    },
    subject_id: {
      type: Number,
    },
    subjectPrice: {
      type: Number,
      default: 0.0,
    },
    subjectDescription: {
      type: String
    },
    subjectFaculty:{
      type:String
    },
    freeTopics: {
      freeTopics_id: {
        type: Number,
      },
      freeTopic: [
        {
          freeTopic_id: {
            type: Number,
          },
          freetopicName: {
            type: String,
          },
        },
      ],
    },
    topics: [
      {
        topicName: {
          type: String,
        },
        topic_Id: {
          type: String,
        },
        topicPrice: {
          type: Number,
          default: 0.0,
        },
        subTopics: [
          {
            subTopicName: {
              type: String
            },
            subTopic_id: {
              type: Number
            },
            subTopicDescription: {
              type:String
            }
          },
        ],
      },
    ],
  },
  {
    collection: "vimeoVideoDB",
  }
);

const vimeoData = mongoose.model("VIMEOVIDEODB", videoschema);

module.exports = vimeoData;
