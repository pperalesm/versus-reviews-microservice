import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { CommonConstants, Pagination } from "backend-common";
import { Model, SortOrder } from "mongoose";
import { Review, ReviewDocument } from "../domain/entities/review.entity";

@Injectable()
export class ReviewsRepository {
  constructor(
    @Inject("KAFKA") private readonly kafka: ClientKafka,
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(review: Review): Promise<Review> {
    try {
      const createdReview = await this.reviewModel.create(review);

      this.kafka.emit(
        CommonConstants.REVIEW_CREATED_EVENT,
        createdReview.toJSON(),
      );

      return createdReview;
    } catch (e) {
      throw new ConflictException();
    }
  }

  async deleteOne(filter: Record<string, unknown>): Promise<Review> {
    const review = await this.reviewModel.findOneAndDelete(filter);

    if (!review) {
      throw new NotFoundException();
    }

    this.kafka.emit(CommonConstants.REVIEW_DELETED_EVENT, review.toJSON());

    return review;
  }

  async find(
    page: Pagination,
    filter?: Record<string, unknown>,
    sort?: { [key: string]: SortOrder },
  ): Promise<Review[]> {
    return await this.reviewModel
      .find(filter)
      .skip(page.skip)
      .limit(page.limit)
      .sort(sort);
  }

  async updateOne(
    filter: Record<string, unknown>,
    updateInfo: Record<string, unknown>,
  ): Promise<Review> {
    const session = await this.reviewModel.startSession();

    session.startTransaction();

    const oldReview = await this.reviewModel
      .findOneAndUpdate(filter, updateInfo)
      .session(session);
    const newReview = await this.reviewModel.findOne(filter).session(session);

    await session.commitTransaction();

    if (!oldReview || !newReview) {
      throw new NotFoundException();
    }

    this.kafka.emit(CommonConstants.REVIEW_UPDATED_EVENT, {
      oldReview: oldReview.toJSON(),
      newReview: newReview.toJSON(),
    });

    return newReview;
  }
}
