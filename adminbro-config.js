const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const Category = require('./models/Category')
const Contact = require('./models/Contact')
const Furniture = require('./models/Furniture')

const initializeAdminBro = (connection) => {
    AdminBro.registerAdapter(AdminBroMongoose);
    const adminBro = new AdminBro({
        resources: [
            {
                resource: Contact,
                options: {
                    properties: {
                        '_id': {
                            isVisible: { list: false, filter: true, show: true, edit: false }
                        },
                        seen: {
                            isRequired: true
                        }
                    }
                }
            },
            Category,
            {
                resource: Furniture,
                options: {
                    properties: {
                        '_id': {
                            isVisible: { list: false, filter: true, show: true, edit: false }
                        },
                        image: {
                            isVisible: {show: false, list: false, edit: true, filter: false}
                        },
                        imagefile: {
                            components: {
                                show: AdminBro.bundle('./admin-components/FurnitureImage'),
                                list: AdminBro.bundle('./admin-components/FurnitureImage')
                            },
                            isVisible: {show: true, list: true, edit: false, filter: false},
                            position: -2
                        }
                    }
                }
            }
        ],
        branding: {
            companyName: "Fran's Furniture"
        }
    })
    const router = AdminBroExpress.buildRouter(adminBro)
    return { adminBro, router };
}

module.exports = initializeAdminBro;