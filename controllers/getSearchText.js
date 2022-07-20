import Idea from "../models/idea.js"
import err404 from "../errors/err404.js"
import errPagination from "../errors/errPagination.js"
import MetaData from "./utils/searchTextMetaData.js"

export default async function getSearchText(req, res, next) {
    try {
        const { page, limit, searchText } = req.query

        const totalMatchedIdeas = await Idea.find({ $text: { $search: searchText } })
        const matchedIdeas = await Idea.find({ $text: { $search: searchText } }).limit(limit * 1).skip((page - 1) * limit)

        if (totalMatchedIdeas == 0) {
            return next(err404)
        }

        const metaData = MetaData(page, limit, matchedIdeas, totalMatchedIdeas.length, searchText)

        if (metaData.currentPage > metaData.totalPage) {
            // return res.send({ caution: "flip back a little🚧" })
            console.log('hello1')
            return next(errPagination)
        }
        console.log('hello2')

        return res.status(200).json({ metaData, ideas: matchedIdeas })
    } catch {
        const error = new Error('Cannot GET Matched Items')
        return next(error)
    }
}