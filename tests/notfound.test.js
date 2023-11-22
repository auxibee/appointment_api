const app = require("../app")
const { request, expect } = require("./config")





describe('GET /notfound', function(){
  

    it('return 404 for undefined routes', async function (){
      
  
      const response = await request.get('/notfound')
      const res = await request.get('/404')
      
      expect(response.status).to.eql(404)
      expect(res.status).to.eql(404)
     
   
    
    })
  
  
  })
  