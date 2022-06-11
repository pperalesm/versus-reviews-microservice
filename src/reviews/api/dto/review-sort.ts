import { InputType, Field } from "@nestjs/graphql";
import { IsEnum, IsOptional } from "class-validator";
import { Sorting } from "backend-common";

@InputType()
export class ReviewSort {
  @Field(() => Sorting, { nullable: true })
  @IsEnum(Sorting)
  @IsOptional()
  updatedAt?: Sorting;

  @Field(() => Sorting, { nullable: true })
  @IsEnum(Sorting)
  @IsOptional()
  rating?: Sorting;
}
