import Idea from "../models/idea.js"
import MetaData from "./utils/searchTextMetaData.js"

export default async function getSearchText(req, res) {
    try {
        const { page, limit, searchText } = req.query

        const totalMatchedIdeas = await Idea.find({ $text: { $search: searchText } })
        const matchedIdeas = await Idea.find({ $text: { $search: searchText } }).limit(limit * 1).skip((page - 1) * limit)

        if (totalMatchedIdeas == 0) {
            return res.status(404).json({ error: 'No Match Found' })
        }

        const metaData = MetaData(page, limit, matchedIdeas, totalMatchedIdeas.length, searchText)

        if (metaData.currentPage > metaData.totalPage) {
            return res.send({ caution: "flip back a little🚧" })
        }

        return res.status(200).json({ metaData, matchedIdeas })
    } catch (error) {
        return error
    }
}