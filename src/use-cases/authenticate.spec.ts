import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        authenticateUseCase = new AuthenticateUseCase(usersRepository)
    })

    it('should not be able to authenticate', async () => {
        await usersRepository.create({
            nome: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await authenticateUseCase.execute({
            email: 'jhondoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
        })
            it('should not be able to authenticate with wrong email', async () => {
        expect(() => authenticateUseCase.execute({
            email: 'jhoendoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
        })

        it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            nome: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password_hash: await hash('123456', 6),
        })

        expect(() => authenticateUseCase.execute({
            email: 'jhoendoe@example.com',
            password: '123123',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
        })
    })
