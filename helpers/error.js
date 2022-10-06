const config = require('config');

class ErrorHandler extends Error {
    constructor(status, msg, location) {
        super();
        this.status = status;
        this.msg = msg;
        this.location = location;
    }
}

const handleError = (err, res) => {
    const { status, message, location, stack } = err;
    res.status(status || 500).json({
        message,
        location,
        stack,
        err
    });
};

module.exports = {
    error: ErrorHandler,
    handleError
};
