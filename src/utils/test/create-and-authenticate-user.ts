import { FastifyInstance } from 'fastify'
import  request  from 'supertest'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
    await prisma.user.create({
        data: {
            nome: 'Jhon Doe',
            email: 'jhoendoe@example.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER',
        },
    })

        const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'jhoendoe@example.com',
            password: '123456',
        })

        const { token } = authResponse.body

        return {
            token
    }
}