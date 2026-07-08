import { CheckIn, User } from "@/generated/prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInHistoryUseCaseRequest {
    UserId: string
    page: number
}

interface FetchUserCheckInHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({
        UserId,
        page,
        }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
            const checkIns = await this.checkInsRepository.findManyByUserId(UserId, page)

        return {
            checkIns,
        }
    }
}


