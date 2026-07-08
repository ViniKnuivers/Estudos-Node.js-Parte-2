import { randomUUID } from "node:crypto"
import type { Prisma, User } from "../generated/prisma/client"
import { UsersRepository } from "./users-repository"

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []

    async findById(id: string) {
        const user = this.users.find((user) => user.id === id)
        if (!user) {
        return null
    }
    return user
    }

    async findByEmail(email: string){
        const user = this.users.find((user) => user.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user: User = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            password_hash: data.password_hash,
            role: data.role ?? 'MEMBER',
            created_at: new Date(),
        }

        this.users.push(user)

        return user
    }
}
