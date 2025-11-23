import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { CatsModule } from './cats/cats.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';

@Module({
	imports: [
		CatsModule,
		AuthorsModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			graphiql: true,
			// playground: true,
			typePaths: ['**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class',
			},
			installSubscriptionHandlers: true,
			// DataLoaderの設定を追加
			context: () => {
				return {
					loaders: {
						postsByAuthorId: new DataLoader<number, any[]>(
							async (authorIds: number[]) => {
								const postsService = new PostsService();
								return authorIds.map((authorId) =>
									postsService.findByAuthorId(authorId),
								);
							},
						),
					},
				};
			},
		}),
		PostsModule,
		CommentsModule,
	],
	controllers: [AppController],
	providers: [AppService, PostsService, CommentsService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
