import Idea from "../models/idea.js"
import errorPagination from "../errors/errPagination.js"
import MetaData from "./utils/ideasMetaData.js"

export default async function getIdeas(req, res, next) {
    try {
        const { page = 1, limit = 10 } = req.query

        const ideas = await Idea.find().limit(limit * 1).skip((page - 1) * limit)
        const totalCount = await Idea.countDocuments()

        const metaData = MetaData(ideas, page, limit, totalCount, ideas)

        if (metaData.currentPage > metaData.totalPage) {
            // return res.send({ caution: "flip back a little🚧" })
            return next(errorPagination)
        }

        return res.status(200).json({ metaData, ideas })
    } catch {
        const error = new Error('Cannot GET Ideas')
        return next(error)
    }
}