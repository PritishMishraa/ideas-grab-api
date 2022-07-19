require('dotenv').config()
const mongoose = require('mongoose')

function dbConnect() {
    const url = process.env.MONGO_URI

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const connection = mongoose.connection
    connection.once('open', function () {
        console.log('Database Connected 👍')
    }).on('error', function (err) {
        console.log('Database Not Connected : ', err);
    });
}

module.exports = dbConnect