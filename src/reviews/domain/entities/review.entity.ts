import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema({ timestamps: true })
export class Review {
  id?: string;

  @Field()
  @Prop()
  username?: string;

  @Field()
  @Prop()
  game?: string;

  @Field(() => Int)
  @Prop()
  rating?: number;

  @Field(() => Int, { nullable: true })
  @Prop()
  payToWin?: number;

  @Field({ nullable: true })
  @Prop()
  comment?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  constructor({
    id,
    username,
    game,
    rating,
    payToWin,
    comment,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    username?: string;
    game?: string;
    rating?: number;
    payToWin?: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.username = username;
    this.game = game;
    this.rating = rating;
    this.payToWin = payToWin;
    this.comment = comment;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type ReviewDocument = Review & Document;

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.index({ username: 1, game: 1 }, { unique: true });
