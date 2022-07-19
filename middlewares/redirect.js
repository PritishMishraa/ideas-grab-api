export default function redirect(req, res, next) {
    const originalUrl = req.originalUrl

    if (!originalUrl.includes('?')) {
        return res.redirect(originalUrl + "?searchText=phone")
    }

    return next()
}