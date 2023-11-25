const db = require("../models")

async function createUser(request,email, password){
    const response = await request.post('/auth/signup')
                                  .send({email: email, password: password})
                                  .set('Accept', 'application/json')
    return response
}

async function loginUser(request, email, password){
    const response = await request.post('/auth/login')
                                  .send({email: email, password: password})
                                  .set('Accept', 'application/json')
    return response

}

async function createAppointmentDays(request, token, year, month){
    const response = await request.post('/admin/appointmentdays')
                                  .set('Authorization', `Bearer ${token}`)
                                  .send({year, month})
    return response
}

async function updateAppointmentDaySlot(request, token, slots){
    const response =  await request.put('/admin/appointmentday/1')
                                    .set('Authorization', `Bearer ${token}`)
                                    .send({slots : slots})
    return response
}

async function createAppointment(request, token,userId, appointmentDayId){
    const response =  await request.post('/appointment')
                                    .set('Authorization', `Bearer ${token}`)
                                    .send({userId, appointmentDayId})
    return response
}

async function resetDb(){
    console.log('Reseting database.....');
    Object.values(db.sequelize.models).map(async function(model){
        await model.destroy({truncate: true, restartIdentity: true})
        await db.sequelize.query(`DELETE FROM "sqlite_sequence" WHERE "name" = 'Users'`)
    })
   
}

module.exports = {
    createUser, 
    loginUser, 
    createAppointmentDays, 
    updateAppointmentDaySlot, 
    createAppointment,
    resetDb
 }