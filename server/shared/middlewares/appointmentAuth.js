const {Appointment} = require('../../../models')
const statusCodes = require('../statusCodes')
const ApiError = require('../utils/apiError')

async function appointmentAuth(req, res, next){
    const {id } = req.params
    const appointmentByUserId = await  Appointment.findOne({where: {userId: req.user.id, id: id}})
    if(!appointmentByUserId || req.user.role === 'admin' ){
        throw new ApiError('Appointment not found for user', statusCodes.UNAUTHOURIZED)
    }
    next()
}

module.exports = { appointmentAuth }