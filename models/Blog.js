const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String
    },
    blogContent: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.Object
    },
    createdById: {
        type: Schema.Types.ObjectId,
        ref: "NORMALADMINDATA"
    },
    image: [{ type: Schema.Types.Object }],
    category: {
        type: String
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    comments: [{ type: Schema.Types.Object }]
}, { timestamps: true })



articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
        })
    }
    next()
})


module.exports = mongoose.model('Article', articleSchema);