import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Constants } from "./constants";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
  imports: [
    ReviewsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${Constants.REVIEWS_DB}?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
