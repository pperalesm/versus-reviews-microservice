import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CommonConstants, KafkaEvent } from "backend-common";
import { GamesService } from "src/games/domain/games.service";

@Controller()
export class KafkaConsumer {
  constructor(private readonly gamesService: GamesService) {}

  @EventPattern(CommonConstants.GAMES_TOPIC)
  async handleGameEvent(@Payload("value") data: KafkaEvent) {
    try {
      if (data.type == CommonConstants.CREATED_EVENT) {
        await this.gamesService.handleCreated(
          data.payload.item.title,
          data.uuid,
        );
      } else if (data.type == CommonConstants.DELETED_EVENT) {
        await this.gamesService.handleDeleted(
          data.payload.item.title,
          data.uuid,
        );
      } else if (data.type == CommonConstants.UPDATED_EVENT) {
        await this.gamesService.handleUpdated(
          data.payload.oldItem.title,
          data.payload.newItem.title,
          data.uuid,
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
}
