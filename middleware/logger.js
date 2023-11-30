// @desc        Logs request to console
const {log} = require('console')

const logger =  (req, res, next)=>{
    log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

module.exports = logger