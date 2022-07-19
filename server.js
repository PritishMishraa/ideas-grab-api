const express = require('express')
const dbConnect = require('./DB/db')
const cors = require('cors')
const Idea = require('./models/idea')

dbConnect()
const app = express()
app.use(cors())
//------------------------------------------------
// get route for random idea
app.get('/random', (_req, res) => {
    Idea.random(function (_err, idea) {
        res.send({ idea });
    });
})
//------------------------------------------------
// middleware for randomBatch route for limiting the limit value to 25
app.use('/randomBatch', (req, res, next) => {
    if (parseInt(req.query.limit) > 25) {
        const limit = req.query.limit
        let redirectUrl = req.originalUrl.replace(limit, "25");
        res.redirect(redirectUrl);
    } else {
        next()
    }
})

// middleware for randomBatch route for handling limit query value
app.use('/randomBatch', (req, res, next) => {
    if (!req.query.limit) {
        let redirectUrl = req.originalUrl;
        if (redirectUrl.includes("limit=")) {
            redirectUrl = req.originalUrl.replace("limit=", "limit=10");
            res.redirect(redirectUrl);
            return
        }
        if (redirectUrl.includes("limit")) {
            redirectUrl = req.originalUrl.replace("limit", "limit=10");
            res.redirect(redirectUrl);
            return
        }
        redirectUrl = req.baseUrl
        if (redirectUrl.includes("?")) {
            redirectUrl += "&limit=10";
        } else {
            redirectUrl += "?limit=10";
        }
        res.redirect(redirectUrl);
    } else {
        next()
    }
})

// get route for randomBatch of ideas
app.get('/randomBatch', (req, res) => {
    let { limit } = req.query
    const count = limit
    Idea.randomBatch(limit, function (_err, ideas) {
        res.send({ count, ideas });
    });
})
//------------------------------------------------
// middleware for ideas route that handles page values
app.use('/ideas', (req, res, next) => {
    if (!req.query.page) {
        let redirectUrl = req.baseUrl;
        if (redirectUrl.includes("?")) {
            redirectUrl += "&page=1";
        } else {
            redirectUrl += "?page=1";
        }
        res.redirect(redirectUrl);
    } else {
        next()
    }
})

// middleware for ideas route that handles limit values
app.use('/ideas', (req, res, next) => {
    if (!req.query.limit) {
        let redirectUrl = req.originalUrl;
        if (redirectUrl.includes("limit=")) {
            redirectUrl = req.originalUrl.replace("limit=", "limit=10");
            res.redirect(redirectUrl);
            return
        }
        if (redirectUrl.includes("limit")) {
            redirectUrl = req.originalUrl.replace("limit", "limit=10");
            res.redirect(redirectUrl);
            return
        }
        if (redirectUrl.includes("?")) {
            redirectUrl += "&limit=10";
        } else {
            redirectUrl += "?limit=10";
        }
        res.redirect(redirectUrl);
    } else {
        next()
    }
})

// middleware for ideas route for limiting the limit value to 25
app.use('/ideas', (req, res, next) => {
    if (parseInt(req.query.limit) > 100) {
        const limit = req.query.limit
        let redirectUrl = req.originalUrl.replace(limit, "100");
        res.redirect(redirectUrl);
    } else {
        next()
    }
})

// get route for all ideas 
app.get('/ideas', async (req, res) => {
    let { page, limit } = req.query

    // getting limited ideas from the collection 
    const ideas = await Idea.find().limit(limit * 1).skip((page - 1) * limit)

    // meta data
    const count = ideas.length
    const totalCount = await Idea.countDocuments()
    page = parseInt(page)
    const totalPage = Math.ceil(totalCount / limit)
    let lastItemIndex
    if (totalCount > (page * limit)) {
        lastItemIndex = (page * limit);
    } else {
        lastItemIndex = totalCount;
    };

    res.send({ count, totalCount, page, totalPage, lastItemIndex, ideas })
})
//------------------------------------------------
// middleware for search route
app.use('/search', (req, res, next) => {
    if (!req.query.searchText) {
        let redirectUrl = req.baseUrl;
        if (redirectUrl.includes("?")) {
            redirectUrl += "&searchText=phone";
        } else {
            redirectUrl += "?searchText=phone";
        }
        res.redirect(redirectUrl);
    } else {
        next()
    }
})
// get route for search the text
app.get('/search', async (req, res) => {
    let { page = 1, limit = 10, searchText = phone } = req.query

    let totalIdeas = await Idea.find({ $text: { $search: searchText } })
    // getting limited ideas from the collection where the search string matches 
    const ideas = await Idea.find({ $text: { $search: searchText } }).limit(limit * 1).skip((page - 1) * limit)

    // meta data
    const count = ideas.length
    const totalCount = totalIdeas.length
    page = parseInt(page)
    const totalPage = Math.ceil(totalCount / limit)
    let lastItemIndex
    if (totalCount > (page * limit)) {
        lastItemIndex = (page * limit);
    } else {
        lastItemIndex = totalCount;
    };

    res.send({ count, totalCount, page, totalPage, lastItemIndex, ideas })
})
//------------------------------------------------
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}, visit : http://localhost:${PORT}/`))