import { InputType, Field, Int } from "@nestjs/graphql";
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { Constants } from "src/constants";

@InputType()
export class CreateReviewDto {
  @Field()
  @IsString()
  game: string;

  @Field(() => Int)
  @IsInt()
  @Min(Constants.MIN_RATING_VALUE)
  @Max(Constants.MAX_RATING_VALUE)
  rating: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(Constants.MIN_P2W_VALUE)
  @Max(Constants.MAX_P2W_VALUE)
  @IsOptional()
  payToWin?: number;

  @Field({ nullable: true })
  @MinLength(Constants.MIN_COMMENT_CHARACTERS)
  @MaxLength(Constants.MAX_COMMENT_CHARACTERS)
  @IsOptional()
  comment?: string;
}
