import { Injectable } from "@nestjs/common";
import { ReviewsRepository } from "../infrastructure/reviews.repository";

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}
}
