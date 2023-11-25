/* eslint-disable no-undef */

const statusCodes = require("../server/shared/statusCodes");
const { request, expect } = require("./config");
const { createUser, loginUser, resetDb } = require("./utils");

before(resetDb)

describe('POST /auth/signup', function (){
  it("creates a new user", async function(){
    const response = await createUser(request,'test@gmail.com', 'samplepassword')
    const attributes = await response.body
    expect(response.status).to.eql(201);
    expect(attributes.email).to.eql('test@gmail.com')
    expect(attributes.id).to.eql(1)

  })

  it("fails without an email or invalid email", async function(){
    const response = await  createUser(request,'','dfsdfds')
    
    expect(response.status).to.eql(statusCodes.FORBIDDEN)
    expect(response.body.error.length).to.eql(2)
    expect(response.body.error[0].msg).to.eql('Email is required')
    expect(response.body.error[1].msg).to.eql('Email should be valid')
    
  })

  it("fails without an invalid email", async function(){
    const response = await createUser(request,'dfsfadf','dfsdfds')
    
    expect(response.status).to.eql(statusCodes.FORBIDDEN)
    expect(response.body.error.length).to.eql(1)
    expect(response.body.error[0].msg).to.eql('Email should be valid')
    
  })

  it("fails without a password or password with less than 5 characters", async function(){
    const response = await createUser(request,'test@gmail.com','')
    
    expect(response.status).to.eql(statusCodes.FORBIDDEN)
    expect(response.body.error.length).to.eql(2)
    expect(response.body.error[0].msg).to.eql('Password cannot be empty')
    expect(response.body.error[1].msg).to.eql('Password Lenght must be atleat 5 characters')
    
  })
})

describe('POST auth/login', function(){
  it('Authenticates a user with a valid credential', async function (){
    // create a new user
    const newUser = await createUser(request, 'yaw@gmail.com','testpassword')

    const response = await request.post('/auth/login')
                                  .send({email: 'yaw@gmail.com', password: 'testpassword'})
    const keys = Object.keys(response.body)
    expect(response.status).to.eql(200)
    expect(response.body.email).to.eql('yaw@gmail.com')
    expect(keys).to.include.members(['id', 'token', 'email']);
  })

  it('Fails with an invalid credential', async function(){
    

    const responseX = await loginUser(request,'wrongemail@gmail.com', 'testpassword')
    const responseY = await loginUser(request,'yaw@gmail.com','wrongpassword')

    expect(responseX.status).to.eql(statusCodes.FORBIDDEN)
    expect(responseX.body.error).to.eql('Wrong username or password')

    expect(responseY.status).to.eql(statusCodes.FORBIDDEN)
    expect(responseY.body.error).to.eql('Wrong username or password')
  })
})

