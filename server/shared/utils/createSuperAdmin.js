require('dotenv').config()
const {User} = require('../../../models')
const config = require('../../config/general')
const { hashPassword } = require('./hashPassword')

async function createSuperAdmin(){
      if(!config.ADMIN_EMAIL && !config.ADMIN_PASSWORD){
          process.exit(1)
      }
     const admin = await User.findOne({where: {email: config.ADMIN_EMAIL}})
     
     if(admin) return

     const hash = await hashPassword(config.ADMIN_PASSWORD)
     await User.create({email: config.ADMIN_EMAIL, password: hash, role: 'admin'})
    
}


module.exports = { createSuperAdmin }