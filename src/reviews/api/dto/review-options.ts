import { InputType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Pagination } from "backend-common";
import { ReviewFilter } from "./review-filter";
import { ReviewSort } from "./review-sort";

@InputType()
export class ReviewOptions {
  @Field(() => Pagination)
  @ValidateNested()
  @Type(() => Pagination)
  page: Pagination;

  @Field(() => ReviewFilter, { nullable: true })
  @ValidateNested()
  @Type(() => ReviewFilter)
  filter?: ReviewFilter;

  @Field(() => ReviewSort, { nullable: true })
  @ValidateNested()
  @Type(() => ReviewSort)
  sort?: ReviewSort;
}
