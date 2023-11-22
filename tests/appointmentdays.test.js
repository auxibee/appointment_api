require('dotenv').config()


const statusCodes = require("../server/shared/statusCodes");
const { createSuperAdmin } = require("../server/shared/utils/createSuperAdmin");

const { request, expect } = require("./config");
const { loginUser, createAppointmentDays } = require("./utils");




describe('POST /appointmentdays', function(){
    let login;
    before(async function(){
        // create an admin user
        await createSuperAdmin()
        login = await loginUser(request, 'fresh@gmail.com','217317auxI*')
    })

    it('Creates appointment days', async function (){
      
      
      const appointmentDays = await createAppointmentDays(request,login.body.token, 2023, 12)
      
      expect(appointmentDays.status).to.eql(201)
      expect(appointmentDays.body.length).to.eql(31);
   
    
    })

    it('Fails with an out of range month', async function(){
        const appointmentDays = await createAppointmentDays(request, login.body.token, 2023, 70)

        expect(appointmentDays.status).to.eql(statusCodes.FORBIDDEN)
    })
  
   
  })
  