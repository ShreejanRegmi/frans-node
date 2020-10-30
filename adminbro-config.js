const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const uploadFeature = require('@admin-bro/upload')
const Category = require('./models/Category')
const Contact = require('./models/Contact')
const Furniture = require('./models/Furniture')
const User = require('./models/User')
const bcrypt = require('bcrypt');

const initializeAdminBro = () => {
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
                            isVisible: false
                        }
                    }
                },
                features: [uploadFeature({
                    provider: { local: { bucket: 'public' } },
                    properties: {
                        key: 'image.path',
                        bucket: 'image.folder',
                        mimeType: 'image.type',
                        size: 'image.size',
                        filename: 'image.filename',
                        file: 'uploadFile'
                    }
                })]
            },
            {
                resource: User,
                options: {
                    properties: {
                        encryptedPassword: { isVisible: false },
                        password: {
                            type: 'password',
                            isVisible: { list: false, edit: true, filter: false, show: false }
                        }
                    },
                    actions: {
                        new: {
                            before: async (request) => {
                                if (request.payload.password) {
                                    request.payload.encryptedPassword = await bcrypt.hash(request.payload.password, 10)
                                    request.payload.password = undefined
                                }
                                return request
                            }
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