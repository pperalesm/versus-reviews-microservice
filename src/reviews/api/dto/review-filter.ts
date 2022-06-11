import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { DateRange } from "backend-common";

@InputType()
export class ReviewFilter {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  game?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  rating?: number;

  @Field(() => DateRange, { nullable: true })
  @ValidateNested()
  @Type(() => DateRange)
  updatedAt?: DateRange;
}
