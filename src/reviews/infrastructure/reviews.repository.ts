import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Review, ReviewDocument } from "../domain/entities/review.entity";

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectModel(Review.name)
    private gameModel: Model<ReviewDocument>,
  ) {}
}
