import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { BrokerEvent, BrokerEventDocument } from "backend-common";
import { Connection, Model } from "mongoose";
import {
  Review,
  ReviewDocument,
} from "src/reviews/domain/entities/review.entity";
import { Game, GameDocument } from "../domain/entities/game.entity";

@Injectable()
export class GamesRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
    @InjectModel(BrokerEvent.name)
    private eventModel: Model<BrokerEventDocument>,
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

  async create(game: Game, uuid: string) {
    await this.connection.transaction(async (session) => {
      await Promise.all([
        this.eventModel.create([{ uuid: uuid }], {
          session: session,
        }),
        this.gameModel.create([game], { session: session }),
      ]);
    });
  }

  async deleteOne(filter: Record<string, unknown>, uuid: string) {
    await this.connection.transaction(async (session) => {
      await Promise.all([
        this.eventModel.create([{ uuid: uuid }], {
          session: session,
        }),
        this.gameModel.deleteOne(filter).session(session),
      ]);
    });
  }

  async updateOne(
    reviewsfilter: Record<string, unknown>,
    reviewsUpdateInfo: Record<string, unknown>,
    gamesfilter: Record<string, unknown>,
    gamesUpdateInfo: Record<string, unknown>,
    uuid: string,
  ) {
    await this.connection.transaction(async (session) => {
      await Promise.all([
        this.eventModel.create([{ uuid: uuid }], {
          session: session,
        }),
        this.reviewModel
          .updateMany(reviewsfilter, reviewsUpdateInfo)
          .session(session),
        this.gameModel.updateOne(gamesfilter, gamesUpdateInfo).session(session),
      ]);
    });
  }
}
