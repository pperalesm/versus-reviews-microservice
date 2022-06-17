import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Pagination } from "backend-common";
import { Model, SortOrder } from "mongoose";
import { Review, ReviewDocument } from "../domain/entities/review.entity";

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(review: Review): Promise<Review> {
    try {
      return await this.reviewModel.create(review);
    } catch (e) {
      throw new ConflictException();
    }
  }

  async deleteOne(filter: Record<string, unknown>): Promise<Review> {
    const review = await this.reviewModel.findOneAndDelete(filter);

    if (!review) {
      throw new NotFoundException();
    }

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
}
