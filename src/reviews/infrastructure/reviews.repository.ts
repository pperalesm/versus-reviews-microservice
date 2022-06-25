import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import {
  CommonConstants,
  CreatedEvent,
  DeletedEvent,
  Pagination,
  UpdatedEvent,
} from "backend-common";
import { Connection, Model, SortOrder } from "mongoose";
import { Review, ReviewDocument } from "../domain/entities/review.entity";

@Injectable()
export class ReviewsRepository {
  constructor(
    @Inject("KAFKA") private readonly kafka: ClientKafka,
    @InjectConnection() private connection: Connection,
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(review: Review): Promise<Review> {
    try {
      const createdReview = await this.reviewModel.create(review);

      this.kafka.emit(CommonConstants.REVIEWS_TOPIC, {
        key: createdReview.id,
        value: new CreatedEvent(createdReview),
      });

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

    this.kafka.emit(CommonConstants.REVIEWS_TOPIC, {
      key: review.id,
      value: new DeletedEvent(review),
    });

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
    let oldReview: ReviewDocument;
    let newReview: ReviewDocument;

    await this.connection.transaction(async (session) => {
      oldReview = await this.reviewModel
        .findOneAndUpdate(filter, updateInfo)
        .session(session);
      newReview = await this.reviewModel.findOne(filter).session(session);
    });

    if (!oldReview || !newReview) {
      throw new NotFoundException();
    }

    this.kafka.emit(CommonConstants.REVIEWS_TOPIC, {
      key: newReview.id,
      value: new UpdatedEvent(oldReview, newReview),
    });

    return newReview;
  }

  async findOne(filter: Record<string, unknown>): Promise<Review> {
    const review = await this.reviewModel.findOne(filter);

    if (!review) {
      throw new NotFoundException();
    }

    return review;
  }
}
