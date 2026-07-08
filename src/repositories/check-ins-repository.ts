import { CheckIn, Prisma } from "@/generated/prisma/client";

export interface CheckInsRepository{
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findById(id: string): Promise<CheckIn | null>
    findByUserIdOnDate(UserId: string, date: Date): Promise<CheckIn | null>
    countByUserId(UserId: string): Promise<number>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    save(checkIn: CheckIn): Promise<CheckIn>
}