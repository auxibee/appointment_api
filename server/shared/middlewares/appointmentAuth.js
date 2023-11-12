const {Appointment} = require('../../../models')
const ApiError = require('../utils/apiError')

async function appointmentAuth(req, res, next){
    const {id } = req.params
    const appointmentByUserId = await  Appointment.findOne({where: {userId: req.user.id, id: id}})
    if(!appointmentByUserId){
        throw new ApiError('Appointment not found for user', 403)
    }
    next()
}

module.exports = { appointmentAuth }