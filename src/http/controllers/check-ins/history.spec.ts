import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'


describe('Check-in History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list the check-ins history', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const profileResponse = await request(app.server)
        .get('/me')
        .set('Authorization', `Bearer ${token}`)
        .send()

        const user = profileResponse.body.user

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -27.2092052,
                longitude: -49.6401091,
            },
        })

        await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id,
            },
        })

        await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id,
            },
        })

        const response = await request(app.server)
        .get('/check-ins/history')
        .query({
            page: 1,
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toHaveLength(2)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({ gym_id: gym.id }),
            expect.objectContaining({ gym_id: gym.id }),
        ])
    })
})