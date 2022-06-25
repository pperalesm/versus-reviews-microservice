import { Injectable } from "@nestjs/common";
import { GamesRepository } from "../infrastructure/games.repository";
import { Game } from "./entities/game.entity";

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  async findOne(title: string) {
    return await this.gamesRepository.findOne({ title: title });
  }

  async handleCreated(title: string, uuid: string) {
    await this.gamesRepository.create(new Game({ title: title }), uuid);
  }

  async handleDeleted(title: string, uuid: string) {
    await this.gamesRepository.deleteOne({ title: title }, uuid);
  }

  async handleUpdated(oldTitle: string, newTitle: string, uuid: string) {
    if (oldTitle != newTitle) {
      await this.gamesRepository.updateOne(
        { game: oldTitle },
        { game: newTitle },
        { title: oldTitle },
        { title: newTitle },
        uuid,
      );
    }
  }
}
