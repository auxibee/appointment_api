require('dotenv').config()


const statusCodes = require("../server/shared/statusCodes");
const { createSuperAdmin } = require("../server/shared/utils/createSuperAdmin");

const { request, expect } = require("./config");
const { loginUser, createAppointmentDays, updateAppointmentDaySlot, resetDb } = require("./utils");


  
let login;
before(async function(){
    // reset database
    await resetDb()
    
    // create an admin user
    await createSuperAdmin()
    login = await loginUser(request, 'fresh@gmail.com','217317auxI*')
    console.log(login.body);
})



describe('POST /appointmentdays', function(){
 

    it('Creates appointment days', async function (){
      
      
      const appointmentDays = await createAppointmentDays(request,login.body.token, 2023, 12)
      
      expect(appointmentDays.status).to.eql(201)
      expect(appointmentDays.body.length).to.eql(31);
   
    
    })

    it('Fails with an out of range month', async function(){
        const appointmentDays = await createAppointmentDays(request, login.body.token, 2023, 70)

        expect(appointmentDays.status).to.eql(statusCodes.FORBIDDEN)
    })

    it('fails without year input', async function(){
        const appointmentDays = await createAppointmentDays(request, login.body.token, '', 10)
        
        expect(appointmentDays.status).to.eql(statusCodes.FORBIDDEN)
        
    })

    it('fails without month input', async function(){
        const appointmentDays = await createAppointmentDays(request, login.body.token, 2, '')
        
        expect(appointmentDays.status).to.eql(statusCodes.FORBIDDEN)
    })

    it('updates avialable slots for appointment', async function(){
        // const appointmentDays = await createAppointmentDays(request,login.body.token, 2023, 12)

        const appointmentDay = await updateAppointmentDaySlot(request, login.body.token, 50)
        console.log(appointmentDay.body);
        expect(appointmentDay.status).to.eql(200)

    })

   
  
   
  })
  