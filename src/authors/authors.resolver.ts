import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PostsService } from '../posts/posts.service';
import { AuthorsService } from './authors.service';

const pubSub = new PubSub();

@Resolver('Author')
export class AuthorsResolver {
	constructor(
		private readonly authorsService: AuthorsService,
		private readonly postsService: PostsService,
	) {}

	@Query('author')
	async author(@Args('id') id: number) {
		return this.authorsService.findById(id);
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
		return pubSub.asyncIterableIterator('commentAdded');
	}
}
