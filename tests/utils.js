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

module.exports = {createUser, loginUser }