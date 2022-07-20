import Idea from "../models/idea.js"

export default function getRandomIdea(_req, res, next) {
    try {
        Idea.randomIdea(function (_err, idea) {
            res.status(200).json({ idea });
        });
    } catch {
        const error = new Error('Cannot GET Random Idea')
        return next(error)
    }
}