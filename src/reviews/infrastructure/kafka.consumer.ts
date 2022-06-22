import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { CommonConstants } from "backend-common";
import { GamesService } from "src/games/domain/games.service";
import { ReviewsService } from "../domain/reviews.service";

@Controller()
export class KafkaConsumer {
  constructor(
    private readonly gamesService: GamesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @EventPattern(CommonConstants.GAME_CREATED_EVENT)
  async handleGameCreated(data: Record<string, any>) {
    try {
      await this.gamesService.create(data.value.title);
    } catch (e) {
      console.error(e);
    }
  }

  @EventPattern(CommonConstants.GAME_DELETED_EVENT)
  async handleGameDeleted(data: Record<string, any>) {
    try {
      await this.gamesService.deleteOne(data.value.title);
    } catch (e) {
      console.error(e);
    }
  }

  @EventPattern(CommonConstants.GAME_UPDATED_EVENT)
  async handleGameUpdated(data: Record<string, any>) {
    try {
      await Promise.all([
        this.gamesService.updateOne(
          data.value.oldGame.title,
          data.value.newGame.title,
        ),
        this.reviewsService.gameUpdated(
          data.value.oldGame.title,
          data.value.newGame.title,
        ),
      ]);
    } catch (e) {
      console.error(e);
    }
  }
}
