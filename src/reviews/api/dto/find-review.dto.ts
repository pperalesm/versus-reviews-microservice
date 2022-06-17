import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class FindReviewDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  game: string;
}
