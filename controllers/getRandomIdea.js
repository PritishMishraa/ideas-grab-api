import Idea from "../models/idea.js"

export default function getRandomIdea(_req, res) {
    try {
        Idea.randomIdea(function (_err, idea) {
            res.status(200).json({ idea });
        });
    } catch (error) {
        return error
    }
}