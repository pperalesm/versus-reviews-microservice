import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthenticatedUser, AuthUser, JwtGqlGuard } from "backend-common";
import { Review } from "../domain/entities/review.entity";
import { ReviewsService } from "../domain/reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewOptions } from "./dto/review-options";

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  @UseGuards(JwtGqlGuard)
  async createAccount(
    @AuthenticatedUser() authUser: AuthUser,
    @Args("createReviewDto") createReviewDto: CreateReviewDto,
  ) {
    return await this.reviewsService.create(authUser, createReviewDto);
  }

  @Query(() => [Review])
  async findReviews(@Args("reviewOptions") reviewOptions: ReviewOptions) {
    return "";
  }
}
