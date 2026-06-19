const express = require("express")

const router = express.Router()

const {
    User,
    Team,
    Task,
    Comment
} = require("../models/models")


router.get("/", (req, res) => {

    res.send(`
        <h1>🚀 Ecomm Practice Backend</h1>

        <p>Backend is running successfully.</p>

        <h3>Available Routes</h3>

        <ul>
            <li>POST /create-user</li>
            <li>POST /create-team</li>
            <li>POST /create-task</li>
            <li>POST /assign-task</li>
            <li>POST /complete-task</li>
            <li>POST /add-comment</li>
            <li>GET /task/:name</li>
        </ul>

        <p>Built with Node.js, Express, MongoDB and Docker.</p>
    `)
})

// create user

router.post("/create-user", async (req, res) => {

    const user = await User.create({
        username: req.body.username
    })

    res.send(user)
})


// create team

router.post("/create-team", async (req, res) => {

    const team = await Team.create({
        teamname: req.body.teamname
    })

    res.send(team)
})


// add member

router.post("/add-member", async (req, res) => {

    const user = await User.findOne({
        username: req.body.username
    })

    const team = await Team.findOne({
        teamname: req.body.teamname
    })

    team.members.push(user._id)

    await team.save()

    res.send(team)
})


// create task

router.post("/create-task", async (req, res) => {

    const user = await User.findOne({
        username: req.body.username
    })

    const team = await Team.findOne({
        teamname: req.body.teamname
    })

    const task = await Task.create({
        taskname: req.body.taskname,
        assignedto: [user._id],
        team: team._id
    })

    res.send(task)
})


// assign task

router.post("/assign-task", async (req, res) => {

    const user = await User.findOne({
        username: req.body.username
    })

    const task = await Task.findOne({
        taskname: req.body.taskname
    })

    task.assignedto.push(user._id)

    await task.save()

    res.send(task)
})


// complete task

router.post("/complete-task", async (req, res) => {

    const task = await Task.findOne({
        taskname: req.body.taskname
    })

    task.completed = true

    await task.save()

    res.send(task)
})


// add comment

router.post("/add-comment", async (req, res) => {

    const user = await User.findOne({
        username: req.body.username
    })

    const task = await Task.findOne({
        taskname: req.body.taskname
    })

    const comment = await Comment.create({
        comment: req.body.comment,
        task: task._id,
        user: user._id
    })

    res.send(comment)
})


// view task

router.get("/task/:name", async (req, res) => {

    const task = await Task.findOne({
        taskname: req.params.name
    })
    .populate("assignedto")
    .populate("team")

    res.send(task)
})

module.exports = router