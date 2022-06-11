import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { CommonModule } from "backend-common";
import { Review, ReviewSchema } from "./domain/entities/review.entity";
import { ReviewsResolver } from "./api/reviews.resolver";
import { ReviewsService } from "./domain/reviews.service";
import { ReviewsRepository } from "./infrastructure/reviews.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "local.env",
      ignoreEnvFile: process.env.NODE_ENV && process.env.NODE_ENV != "local",
    }),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/reviews/schema.gql"),
      context: ({ req, res }) => ({ req, res }),
    }),
    CommonModule,
  ],
  providers: [ReviewsResolver, ReviewsService, ReviewsRepository],
})
export class ReviewsModule {}
