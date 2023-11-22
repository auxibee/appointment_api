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

module.exports = {createUser, loginUser, createAppointmentDays }