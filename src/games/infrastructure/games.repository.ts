import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Game, GameDocument } from "../domain/entities/game.entity";

@Injectable()
export class GamesRepository {
  constructor(
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
  ) {}

  async findOne(filter: Record<string, unknown>) {
    const game = await this.gameModel.findOne(filter);

    if (!game) {
      throw new NotFoundException();
    }

    return game;
  }
}
