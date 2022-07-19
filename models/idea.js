import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ideaSchema = new Schema({
    idea: { type: String, required: true }
}, {
    collection: 'ideas'
})

ideaSchema.index({ idea: 'text' })

ideaSchema.statics.randomIdea = function (callback) {
    this.count(function (err, count) {
        if (err) {
            return callback(err);
        }
        var rand = Math.floor(Math.random() * count);
        this.findOne().skip(rand).exec(callback);
    }.bind(this));
};


ideaSchema.statics.randomIdeas = function (limit, callback) {
    this.count(function (err, count) {
        if (err) {
            return callback(err);
        }
        var rand = Math.floor(Math.random() * count);
        this.find().skip(rand).limit(limit).exec(callback);
    }.bind(this));
};

const Idea = mongoose.model('Idea', ideaSchema)

export default Idea