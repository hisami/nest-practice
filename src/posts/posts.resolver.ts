import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Comment } from 'src/graphql';
import { CommentsService } from '../comments/comments.service';

const pubSub = new PubSub();

@Resolver()
export class PostsResolver {
	constructor(private readonly commentsService: CommentsService) {}

	@Mutation(() => Comment)
	addComment(
		@Args('postId', { type: () => Int }) postId: number,
		@Args('content', { type: () => String }) content: string,
	): Comment {
		const newComment = this.commentsService.addComment(postId, content);
		pubSub.publish('commentAdded', { commentAdded: newComment });
		return newComment;
	}
}
