import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { Constants } from "src/constants";
import { ReviewsService } from "../domain/reviews.service";

@Controller()
export class KafkaConsumer {
  constructor(private readonly reviewsService: ReviewsService) {}

  @EventPattern(Constants.GAME_CREATED_EVENT)
  async handleGameCreated(data: Record<string, unknown>) {
    console.log(data.value);
  }
}
