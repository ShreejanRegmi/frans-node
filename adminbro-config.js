const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

require('./models/Category')
require('./models/Contact')
require('./models/Furniture')


const initializeAdminBro = (connection) => {
    AdminBro.registerAdapter(AdminBroMongoose);
    const adminBro = new AdminBro({
        databases: [connection],
        rootPath: '/admin'
    })
    const router = AdminBroExpress.buildRouter(adminBro)
    return { adminBro, router };
}

module.exports = initializeAdminBro;