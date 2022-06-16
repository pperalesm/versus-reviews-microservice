import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from "backend-common";
import { Review, ReviewSchema } from "./domain/entities/review.entity";
import { ReviewsResolver } from "./api/reviews.resolver";
import { ReviewsService } from "./domain/reviews.service";
import { ReviewsRepository } from "./infrastructure/reviews.repository";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Constants } from "src/constants";
import { KafkaConsumer } from "./infrastructure/kafka.consumer";
import { GamesModule } from "src/games/games.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    ClientsModule.register([
      {
        name: "KAFKA",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: Constants.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_URL],
          },
        },
      },
    ]),
    CommonModule,
    GamesModule,
  ],
  providers: [ReviewsResolver, ReviewsService, ReviewsRepository],
  controllers: [KafkaConsumer],
})
export class ReviewsModule {}
