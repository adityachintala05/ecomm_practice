const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String
})

const TeamSchema = new mongoose.Schema({
    teamname: String,

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

const TaskSchema = new mongoose.Schema({
    taskname: String,

    assignedto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },

    completed: {
        type: Boolean,
        default: false
    }
})

const CommentSchema = new mongoose.Schema({
    comment: String,

    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User", UserSchema)
const Team = mongoose.model("Team", TeamSchema)
const Task = mongoose.model("Task", TaskSchema)
const Comment = mongoose.model("Comment", CommentSchema)

module.exports = {
    User,
    Team,
    Task,
    Comment
}