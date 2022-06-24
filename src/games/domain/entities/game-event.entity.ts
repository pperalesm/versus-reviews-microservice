import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class GameEvent {
  id?: string;

  @Prop({ unique: true })
  timestamp?: string;

  constructor({ id, timestamp }: { id?: string; timestamp?: string }) {
    this.id = id;
    this.timestamp = timestamp;
  }
}

export type GameEventDocument = GameEvent & Document;

export const GameEventSchema = SchemaFactory.createForClass(GameEvent);
