require('dotenv').config()

const statusCodes = require("../server/shared/statusCodes");
const { createSuperAdmin } = require("../server/shared/utils/createSuperAdmin");

const { request, expect } = require("./config");
const { loginUser, createAppointmentDays } = require("./utils");


describe('POST /appointmentdays', function(){
    it('Creates appointment days', async function (){
      // create an admin user
      const admin = await createSuperAdmin()
  
      const response = await loginUser(request, 'fresh@gmail.com','217317auxI*')
      const appointmentDays = await createAppointmentDays(request,response.body.token, 2023, 12)
      
      expect(appointmentDays.status).to.eql(201)
      expect(appointmentDays.body.length).to.eql(31);
   
    
    })
  
    // it('Fails with an invalid credential', async function(){
      
  
    //   const responseX = await loginUser(request,'wrongemail@gmail.com', 'testpassword')
    //   const responseY = await loginUser(request,'yaw@gmail.com','wrongpassword')
  
    //   expect(responseX.status).to.eql(statusCodes.FORBIDDEN)
    //   expect(responseX.body.error).to.eql('Wrong username or password')
  
    //   expect(responseY.status).to.eql(statusCodes.FORBIDDEN)
    //   expect(responseY.body.error).to.eql('Wrong username or password')
    // })
  })
  