import { randomUUID } from "node:crypto"
import { CheckIn, Prisma } from "@/generated/prisma/client"
import { CheckInsRepository } from "./check-ins-repository"

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async findByUserIdOnDate(UserId: string, date: Date): Promise<CheckIn | null> {
        const checkInOnSameDate = this.items.find(checkIn => {
            const isOnSameDate =
                checkIn.created_at.getFullYear() === date.getFullYear() &&
                checkIn.created_at.getMonth() === date.getMonth() &&
                checkIn.created_at.getDate() === date.getDate()

            return checkIn.user_id === UserId && isOnSameDate
        })

        if (checkInOnSameDate) {
            return checkInOnSameDate
        }

        return null
    }

    async findById(id: string) {
        const checkIn = this.items.find((item) => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }
    async findManyByUserId(userId: string, page: number) {
        return this.items
            .filter((item) => item.user_id === userId)
            .slice((page - 1) * 20, page * 20)
    }
    async countByUserId(userId: string) {
        return this.items.filter((item) => item.user_id === userId).length
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn: CheckIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
        }

        this.items.push(checkIn)

        return checkIn
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        if(checkInIndex >= 0) {
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }
}
