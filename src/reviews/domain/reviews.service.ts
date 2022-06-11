import { Injectable } from "@nestjs/common";
import { AuthUser } from "backend-common";
import { CreateReviewDto } from "../api/dto/create-review.dto";
import { ReviewsRepository } from "../infrastructure/reviews.repository";

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async create(authUser: AuthUser, createReviewDto: CreateReviewDto) {
    return "";
  }
}
