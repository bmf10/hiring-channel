module.exports = {
    success: (res, data, msg) => {
        res.status(200)
        res.json({
            status: 200,
            msg,
            data
        })
    },
    error: (res, errors, msg, status) => {
        res.status(status)
        res.json({
            status: status,
            msg,
            errors,
        })
    }
}