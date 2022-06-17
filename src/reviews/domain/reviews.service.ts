import { Injectable } from "@nestjs/common";
import { AuthUser, Sorting } from "backend-common";
import { GamesService } from "src/games/domain/games.service";
import { CreateReviewDto } from "../api/dto/create-review.dto";
import { ReviewOptions } from "../api/dto/review-options";
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

  async deleteOne(authUser: AuthUser, game: string) {
    return await this.reviewsRepository.deleteOne({
      username: authUser.username,
      game: game,
    });
  }

  async find(reviewOptions: ReviewOptions) {
    let sort = {};
    let filter = {};

    if (reviewOptions.filter) {
      const { updatedAt, ...rest } = reviewOptions.filter;
      let updatedAtFilter = {};

      if (updatedAt) {
        updatedAtFilter = {
          updatedAt: {
            $gte: updatedAt.min,
            $lte: updatedAt.max,
          },
        };
      }

      filter = {
        ...updatedAtFilter,
        ...rest,
      };
    }

    if (reviewOptions.sort) {
      sort = { ...reviewOptions.sort };
    } else {
      sort = { title: Sorting.Asc };
    }

    return await this.reviewsRepository.find(reviewOptions.page, filter, sort);
  }
}
