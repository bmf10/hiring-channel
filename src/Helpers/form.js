module.exports = {
    success: (res, data, msg, paginate) => {
        res.status(200)

        res.json({
            status: 200,
            msg,
            data,
            paginate
        })

        // if (page == null) {
        //     res.json({
        //         status: 200,
        //         msg,
        //         data,
        //     })
        // } else {

        // }

    },
    error: (res, errors, msg, status) => {
        res.status(200)
        res.json({
            status: 200,
            msg,
            errors,
        })
    }
}