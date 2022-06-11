import { Query, Resolver } from "@nestjs/graphql";
import { Review } from "../domain/entities/review.entity";
import { ReviewsService } from "../domain/reviews.service";

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => Review)
  async blab() {
    return "";
  }
}
