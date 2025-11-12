import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from '../posts/posts.service';
import { AuthorsService } from './authors.service';

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
}
