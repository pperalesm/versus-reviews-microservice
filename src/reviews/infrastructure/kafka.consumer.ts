import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { CommonConstants } from "backend-common";
import { GamesService } from "src/games/domain/games.service";

@Controller()
export class KafkaConsumer {
  constructor(private readonly gamesService: GamesService) {}

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
}
