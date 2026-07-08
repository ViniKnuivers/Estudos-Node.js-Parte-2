import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'


let gymsRepository = new InMemoryGymsRepository()
let createGymUseCase = new CreateGymUseCase(gymsRepository)

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        createGymUseCase = new CreateGymUseCase(gymsRepository)
    })

    it('Should be able to create a new gym', async () => {
        const { gym } = await createGymUseCase.execute({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -27.2083542,
            longitude: -51.98745321,
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})  
