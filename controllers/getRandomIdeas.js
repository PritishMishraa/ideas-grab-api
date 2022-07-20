import Idea from "../models/idea.js"

export default function getRandomIdeas(req, res, next) {
    try {
        const { limit = 10 } = req.query
        const count = limit
        Idea.randomIdeas(limit, function (_err, ideas) {
            res.status(200).json({ count, ideas });
        });
    } catch {
        const error = new Error('Cannot GET Random Ideas')
        return next(error)
    }
}