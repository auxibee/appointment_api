require('dotenv').config()

const statusCodes = require("../server/shared/statusCodes");
const { createSuperAdmin } = require("../server/shared/utils/createSuperAdmin");

const { request, expect } = require("./config");
const { loginUser, createAppointmentDays } = require("./utils");




describe('POST /appointmentdays', function(){
    before(async function(){
        // create an admin user
        await createSuperAdmin()
    })

    it('Creates appointment days', async function (){
      
  
      const response = await loginUser(request, 'fresh@gmail.com','217317auxI*')
      
      const appointmentDays = await createAppointmentDays(request,response.body.token, 2023, 12)
      
      expect(appointmentDays.status).to.eql(201)
      expect(appointmentDays.body.length).to.eql(31);
   
    
    })
  
   
  })
  