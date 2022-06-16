import { Injectable } from "@nestjs/common";
import { GamesRepository } from "../infrastructure/games.repository";
import { Game } from "./entities/game.entity";

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  async findOne(title: string) {
    return await this.gamesRepository.findOne({ title: title });
  }

  async create(title: string) {
    return await this.gamesRepository.create(new Game({ title: title }));
  }
}
