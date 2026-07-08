import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/client'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let checkInsUseCase: CheckInUseCase

describe('Check-In Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository
        checkInsRepository = new InMemoryCheckInsRepository()
        checkInsUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: -27.2083542,
            longitude: -51.98745321,
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to register a check-in', async () => {
        const { checkIn } = await checkInsUseCase.execute({
            gymId: 'gym-01',
            UserId: 'user-01',
            userLatitude: -27.2083542,
            userLongitude: -51.98745321,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

        await checkInsUseCase.execute({
            gymId: 'gym-01',
            UserId: 'user-01',
            userLatitude: -27.2083542,
            userLongitude: -51.98745321,
        })

        await expect(() =>
            checkInsUseCase.execute({
                gymId: 'gym-01',
                UserId: 'user-01',
                userLatitude: -27.2083542,
                userLongitude: -51.98745321,
            }),
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

        await checkInsUseCase.execute({
            gymId: 'gym-01',
            UserId: 'user-01',
            userLatitude: -27.2083542,
            userLongitude: -51.98745321,
        })

        vi.setSystemTime(new Date(2026, 0, 21, 8, 0, 0))

        const { checkIn } = await checkInsUseCase.execute({
            gymId: 'gym-01',
            UserId: 'user-01',
            userLatitude: -27.2083542,
            userLongitude: -51.98745321,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

        it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'TypeScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-29.8688499),
            longitude: new Decimal(-51.3245345),
        })

        await expect(
            checkInsUseCase.execute({
            gymId: 'gym-02',
            UserId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })
})
