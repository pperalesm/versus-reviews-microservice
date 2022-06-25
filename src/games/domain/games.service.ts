import { Injectable } from "@nestjs/common";
import { GamesRepository } from "../infrastructure/games.repository";
import { Game } from "./entities/game.entity";

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  async findOne(title: string) {
    return await this.gamesRepository.findOne({ title: title });
  }

  async handleCreated(title: string, timestamp: string) {
    await this.gamesRepository.handleCreate(
      new Game({ title: title }),
      timestamp,
    );
  }

  async handleDeleted(title: string, timestamp: string) {
    await this.gamesRepository.handleDelete({ title: title }, timestamp);
  }

  async handleUpdated(oldTitle: string, newTitle: string, timestamp: string) {
    if (oldTitle != newTitle) {
      await this.gamesRepository.handleTitleChange(
        oldTitle,
        newTitle,
        timestamp,
      );
    }
  }
}
