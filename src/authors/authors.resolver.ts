import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';

@Resolver('Author')
export class AuthorsResolver {
	constructor(
		private readonly authorsService: AuthorsService,
		// private readonly postsService: PostsService,
	) {}

	@Query('author')
	async author(@Args('id') id: number) {
		return this.authorsService.findById(id);
	}
}
