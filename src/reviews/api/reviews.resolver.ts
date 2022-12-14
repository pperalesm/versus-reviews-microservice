import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  ActiveGqlGuard,
  AuthenticatedUser,
  AuthUser,
  JwtGqlGuard,
} from "backend-common";
import { Review } from "../domain/entities/review.entity";
import { ReviewsService } from "../domain/reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { FindReviewDto } from "./dto/find-review.dto";
import { ReviewOptions } from "./dto/review-options";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  @UseGuards(JwtGqlGuard, ActiveGqlGuard)
  async createReview(
    @AuthenticatedUser() authUser: AuthUser,
    @Args("createReviewDto") createReviewDto: CreateReviewDto,
  ) {
    return await this.reviewsService.create(authUser, createReviewDto);
  }

  @Mutation(() => Review)
  @UseGuards(JwtGqlGuard, ActiveGqlGuard)
  async deleteReview(
    @AuthenticatedUser() authUser: AuthUser,
    @Args("game") game: string,
  ) {
    return await this.reviewsService.deleteOne(authUser, game);
  }

  @Query(() => [Review])
  async findReviews(@Args("reviewOptions") reviewOptions: ReviewOptions) {
    return await this.reviewsService.find(reviewOptions);
  }

  @Mutation(() => Review)
  @UseGuards(JwtGqlGuard, ActiveGqlGuard)
  async updateReview(
    @AuthenticatedUser() authUser: AuthUser,
    @Args("updateReviewDto") updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.updateOne(authUser, updateReviewDto);
  }

  @Query(() => Review)
  async findReview(@Args("findReviewDto") findReviewDto: FindReviewDto) {
    return await this.reviewsService.findOne(findReviewDto);
  }
}
