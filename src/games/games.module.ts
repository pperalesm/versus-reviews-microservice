import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BrokerEvent, BrokerEventSchema } from "backend-common";
import {
  Review,
  ReviewSchema,
} from "src/reviews/domain/entities/review.entity";
import { Game, GameSchema } from "./domain/entities/game.entity";
import { GamesService } from "./domain/games.service";
import { GamesRepository } from "./infrastructure/games.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([
      { name: BrokerEvent.name, schema: BrokerEventSchema },
    ]),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  providers: [GamesService, GamesRepository],
  exports: [GamesService, GamesRepository],
})
export class GamesModule {}
