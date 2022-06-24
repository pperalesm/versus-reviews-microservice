import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CommonConstants, KafkaEvent } from "backend-common";
import { GamesService } from "src/games/domain/games.service";
import { ReviewsService } from "../domain/reviews.service";

@Controller()
export class KafkaConsumer {
  constructor(
    private readonly gamesService: GamesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @EventPattern(CommonConstants.GAMES_TOPIC)
  async handleGameUpdated(
    @Payload("value") data: KafkaEvent,
    @Payload("timestamp") eventId: string,
  ) {
    try {
      if (data.type == CommonConstants.CREATED_EVENT) {
        await this.gamesService.create(data.payload.item.title);
      } else if (data.type == CommonConstants.DELETED_EVENT) {
        await this.gamesService.deleteOne(data.payload.item.title);
      } else if (data.type == CommonConstants.UPDATED_EVENT) {
        await Promise.all([
          this.gamesService.updateOne(
            data.payload.oldItem.title,
            data.payload.newItem.title,
          ),
          this.reviewsService.gameUpdated(
            data.payload.oldItem.title,
            data.payload.newItem.title,
          ),
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
