import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

        //const usersRepository = new InMemoryUsersRepository()
        //const registerUseCase = new RegisterUseCase(usersRepository)

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUseCase(usersRepository)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'jhondoe@example.com'

        await registerUseCase.execute({
            name: 'Jhon Doe',
            email,
            password: '123456'
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'Jhon Doe',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistError)
    })
})
