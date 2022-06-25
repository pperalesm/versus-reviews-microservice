import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class GameEvent {
  id?: string;

  @Prop({ unique: true })
  uuid?: string;

  constructor({ id, uuid }: { id?: string; uuid?: string }) {
    this.id = id;
    this.uuid = uuid;
  }
}

export type GameEventDocument = GameEvent & Document;

export const GameEventSchema = SchemaFactory.createForClass(GameEvent);
