export default function limit(req, _res, next) {
    const { limit } = req.query

    if (!limit || limit == '0') {
        req.query.limit = 10
        return next()
    }

    if (limit > 25) {
        req.query.limit = 25
        return next()
    }

    return next()
}