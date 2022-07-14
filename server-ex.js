const express = require('express')
const dbConnect = require('./DB/db')
const Tasklist = require('./models/task-list')
const Task = require('./models/task')

dbConnect()
const app = express()

app.use(express.json())

app.post('/api/createtasklist', (req, res) => {
    const taskList = new Tasklist({
        name: req.body.name,
        description: req.body.description,
        active: req.body.active
    })

    taskList.save().then(response => {
        res.send(response)
    })
})

app.post('/api/createtask', (req, res) => {
    const validDateFormat = getValidDateFormat(req.body.dueDate)

    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        periodType: req.body.periodType,
        period: req.body.period,
        dueDate: new Date(validDateFormat),
        taskListID: req.body.taskListID
    })

    task.save().then(response => {
        res.send(response)
    })
})

app.get('/api/tasklist', async (req, res) => {
    const { page = 1, limit = 10, searchText } = req.query

    if(searchText != '') {
        var tasks = await Task.find({$text: {$search: searchText}}).populate('taskListID', 'name').limit(limit * 1).skip((page - 1) * limit)
    }else {
        var tasks = await Task.find().populate('taskListID', 'name').limit(limit * 1).skip((page - 1) * limit)
    }
    
    const count = await Task.countDocuments()
    res.send({ count, tasks })
})

function getValidDateFormat(date) {
    return date.split('-').reverse().join('-')
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}, visit : http://localhost:${PORT}/`))