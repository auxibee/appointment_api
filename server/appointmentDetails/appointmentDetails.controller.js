const {AppointmentDetailsService} = require('./appointmentDetails.service')

const Service = new AppointmentDetailsService()

async function createAppointmentDetailHandler(req, res){
    const {firstName, lastName} = req.body
    const { id } = req.params
    await Service.addAppointmentDetail(id, firstName, lastName)
    res.json({message: 'created'})
    
}

module.exports = { createAppointmentDetailHandler }