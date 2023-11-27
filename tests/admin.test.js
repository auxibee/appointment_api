require('dotenv').config()

const {AppointmentDay} = require('../models')
const config = require('../server/config/general');
const statusCodes = require("../server/shared/statusCodes");
const { createSuperAdmin } = require("../server/shared/utils/createSuperAdmin");


const { request, expect, routes } = require("./config");
const { loginUser, createAppointmentDays, updateAppointmentDaySlot, resetDb, getRequest } = require("./utils");


  
let login;
before(async function(){
    // reset database
    await resetDb()

    // create an admin user
    await createSuperAdmin()
    login = await loginUser(request, config.ADMIN_EMAIL,config.ADMIN_PASSWORD)
    
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
       
        expect(appointmentDay.status).to.eql(200)

    })

   
  
   
  })
 

describe('GET /appointmentday/:appointmentDayId', function (){

    it('returns appointment day status and slots avialable', async () => {
        const appointmentDay = await AppointmentDay.create({day : '2023-10-01'})

        const url = routes.appointmentDays + `/${appointmentDay.id}`
        
        
        const appointmentDays = await getRequest({url, token: login.body.token})
        
        expect(appointmentDays.status).to.eql(200)
        expect(appointmentDays.body.slots).to.eql(100)
        expect(appointmentDays.body.status).to.eql('open')
        expect(appointmentDays.body.id).to.eql(appointmentDay.id)
    })

    it('returns 404 with a non existing apppointment day', async () => {
        const url = routes.appointmentDays + `/100000`
        const appointmentDays = await getRequest({url, token: login.body.token})
        expect(appointmentDays.status).to.eql(404)
    })
})
  