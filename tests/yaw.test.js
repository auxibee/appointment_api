// const statusCodes = require("../server/shared/statusCodes");
// const { createSuperAdmin } = require("../server/shared/utils/createSuperAdmin");
// const { request, expect } = require("./config");
// const { createUser, loginUser, createAppointmentDays, createAppointment } = require("./utils");




// describe('GET /notfound', function(){
  
//     let userLogin, adminLogin;
//     before(async function(){
//         // create an admin user
//         await createSuperAdmin()


//         // login admin user to create appointment days
//         adminLogin = await loginUser(request, 'fresh@gmail.com','217317auxI*')

//         // create a user
//         await createUser(request,'test@gmail.com', 'samplepassword')
        
//         // login user
//         userLogin = await loginUser(request, 'test@gmail.com','samplepassword')

//         // create appointment days
//         await createAppointmentDays(request,adminLogin.body.token, 2023, 12)
//     })
   
//     it("creates a new appointment", async function(){
//         const response = await createAppointment(request, userLogin.body.token, 2, 1)
//         expect(response.status).to.eql(201);
       
    
//       })
   
    
//     })
  
  

  


