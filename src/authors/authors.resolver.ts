import { Inject } from '@nestjs/common';
import {
	Args,
	Context,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
	Subscription,
} from '@nestjs/graphql';
import type DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';
import { Author } from '../graphql';
import { type PostDbEntity, PostsService } from '../posts/posts.service';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { AuthorsService } from './authors.service';

interface GraphQLContext {
	loaders: {
		postsByAuthorId: DataLoader<number, PostDbEntity[]>;
	};
}

@Resolver('Author')
export class AuthorsResolver {
	constructor(
		private readonly authorsService: AuthorsService,
		private readonly postsService: PostsService,
		@Inject(PUB_SUB) private readonly pubSub: PubSub,
	) {}

	@Query('author')
	async author(@Args('id') id: number) {
		return this.authorsService.findById(id);
	}

	@ResolveField('posts')
	async posts(@Parent() author: Author, @Context() context: GraphQLContext) {
		const { id } = author;
		return context.loaders.postsByAuthorId.load(id);
	}

	@Mutation()
	async upvotePost(@Args('postId') postId: number) {
		return this.postsService.upvoteById(postId);
	}

	@Subscription('commentAdded', {
		// filter: (payload, variables) => {
		// 	return payload.commentAdded.title === variables.title;
		// },
	})
	commentAdded() {
		console.log('サブスクライバが呼ばれたよ');
		// 追加されたコメントを返す
		return this.pubSub.asyncIterableIterator('commentAdded');
	}
}
