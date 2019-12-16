module.exports = {
    success: (res, data, msg) => {
        res.json({
            status: 200,
            msg,
            data
        })
    },
    error: (errors) => {
        res.json({
            status: 422,
            errors
        })
    }
}