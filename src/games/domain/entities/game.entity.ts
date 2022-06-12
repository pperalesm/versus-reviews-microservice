import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Game {
  id?: string;

  @Prop({ unique: true })
  title?: string;

  constructor({ id, title }: { id?: string; title?: string }) {
    this.id = id;
    this.title = title;
  }
}

export type GameDocument = Game & Document;

export const GameSchema = SchemaFactory.createForClass(Game);
