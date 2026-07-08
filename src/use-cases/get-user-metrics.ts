import { CheckIn, User } from "@/generated/prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
    UserId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({
        UserId,
        }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
            const checkInsCount = await this.checkInsRepository.countByUserId(UserId)

        return {
            checkInsCount,
        }
    }
}


