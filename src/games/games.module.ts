import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { Game, GameSchema } from "./domain/entities/game.entity";
import { GamesService } from "./domain/games.service";
import { GamesRepository } from "./infrastructure/games.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "local.env",
      ignoreEnvFile: process.env.NODE_ENV && process.env.NODE_ENV != "local",
    }),
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [GamesService, GamesRepository],
  exports: [GamesService, GamesRepository],
})
export class GamesModule {}
