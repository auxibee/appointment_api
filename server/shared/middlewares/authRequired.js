const jwt = require("jsonwebtoken")
const statusCodes = require("../statusCodes")
const ApiError = require("../utils/apiError")
const config = require("../../config/general")

function requireAuth(req, res, next){
    const token = req.headers.authorization
    
    if(!token){
        throw new ApiError('Invalid Authentication', statusCodes.UNAUTHOURIZED)
    }
    try {
        const decodedToken = jwt.verify(token.slice(7), config.JWT_SECRET, {
            algorithms: config.JWT_AlGORITHM,
            expiresIn: config.JWT_EXPIRES
        })
        res.user = decodedToken
        next()
    } catch (error) {
        throw new ApiError('Invalid Authentication', statusCodes.UNAUTHOURIZED)
    }
}

module.exports = { requireAuth }