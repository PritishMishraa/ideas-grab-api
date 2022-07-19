import cors from 'cors'
import path from 'path'
import express from 'express'
import routes from './routes.js'
import favicon from 'serve-favicon'

/** The Express app */
const app = express()
app.use(cors())

/** Favicon */
const __dirname = path.resolve();
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')))

// Redirect the root URL to the github repository
app.get('/', (_req, res) => {
    res.redirect('https://github.com/PritishMishraa/ideas-grab-api')
})

app.use(routes)

export default app