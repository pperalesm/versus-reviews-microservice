import { Injectable } from "@nestjs/common";
import { AuthUser } from "backend-common";
import { GamesService } from "src/games/domain/games.service";
import { CreateReviewDto } from "../api/dto/create-review.dto";
import { ReviewsRepository } from "../infrastructure/reviews.repository";
import { Review } from "./entities/review.entity";

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly gamesService: GamesService,
  ) {}

  async create(authUser: AuthUser, createReviewDto: CreateReviewDto) {
    await this.gamesService.findOne(createReviewDto.game);

    return await this.reviewsRepository.create(
      new Review({ ...createReviewDto, username: authUser.username }),
    );
  }

  async find() {
    return "";
  }
}
