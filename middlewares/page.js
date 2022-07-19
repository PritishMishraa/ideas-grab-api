export default function page(req, _res, next) {
    const { page } = req.query

    if (!page || page == '0') {
        req.query.page = 1
        return next()
    }

    return next()
}