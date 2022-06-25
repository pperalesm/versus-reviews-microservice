import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import {
  Review,
  ReviewDocument,
} from "src/reviews/domain/entities/review.entity";
import {
  GameEvent,
  GameEventDocument,
} from "../domain/entities/game-event.entity";
import { Game, GameDocument } from "../domain/entities/game.entity";

@Injectable()
export class GamesRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
    @InjectModel(GameEvent.name)
    private eventModel: Model<GameEventDocument>,
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  async findOne(filter: Record<string, unknown>): Promise<Game> {
    const game = await this.gameModel.findOne(filter);

    if (!game) {
      throw new NotFoundException();
    }

    return game;
  }

  async create(game: Game, timestamp: string) {
    await this.connection.transaction(async (session) => {
      await this.eventModel.create([{ timestamp: timestamp }], {
        session: session,
      });
      await this.gameModel.create([game], { session: session });
    });
  }

  async deleteOne(filter: Record<string, unknown>, timestamp: string) {
    await this.connection.transaction(async (session) => {
      await this.eventModel.create([{ timestamp: timestamp }], {
        session: session,
      });
      await this.gameModel.deleteOne(filter).session(session);
    });
  }

  async updateOne(
    reviewsfilter: Record<string, unknown>,
    reviewsUpdateInfo: Record<string, unknown>,
    gamesfilter: Record<string, unknown>,
    gamesUpdateInfo: Record<string, unknown>,
    timestamp: string,
  ) {
    await this.connection.transaction(async (session) => {
      await this.eventModel.create([{ timestamp: timestamp }], {
        session: session,
      });
      await this.reviewModel
        .updateMany(reviewsfilter, reviewsUpdateInfo)
        .session(session);
      await this.gameModel
        .updateOne(gamesfilter, gamesUpdateInfo)
        .session(session);
    });
  }
}
