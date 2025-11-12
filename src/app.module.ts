import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { CatsModule } from './cats/cats.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';

@Module({
	imports: [
		CatsModule,
		AuthorsModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			// graphiql: true,
			playground: true,
			typePaths: ['**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class',
			},
			installSubscriptionHandlers: true,
		}),
		PostsModule,
		CommentsModule,
	],
	controllers: [AppController],
	providers: [AppService, PostsService, CommentsService],
})
export class AppModule {}
