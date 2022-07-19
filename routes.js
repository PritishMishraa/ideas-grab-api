import { Router } from 'express'
/** Controllers */
import getIdeas from './controllers/getIdeas.js'
import getRandomIdea from './controllers/getRandomIdea.js'
import getRandomIdeas from './controllers/getRandomIdeas.js'
import getSearchText from './controllers/getSearchText.js'
/** Middlewares */
import page from './middlewares/page.js'
import limit from './middlewares/limit.js'
import redirect from './middlewares/redirect.js'

const router = Router()

/**------------------------------------------------
** Random Ideas
**-----------------------------------------------*/
router.get('/random', getRandomIdea)
router.get('/random-ideas', limit, getRandomIdeas)

/**------------------------------------------------
** All Ideas
**-----------------------------------------------*/
router.get('/ideas', page, limit, getIdeas)

/**------------------------------------------------
** All Ideas
**-----------------------------------------------*/
router.get('/search', redirect, page, limit, getSearchText)

export default router