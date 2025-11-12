import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Comment } from 'src/graphql';
import { CommentsService } from '../comments/comments.service';
import { PUB_SUB } from '../pubsub/pubsub.module';

@Resolver()
export class PostsResolver {
	constructor(
		private readonly commentsService: CommentsService,
		@Inject(PUB_SUB) private readonly pubSub: PubSub,
	) {}

	@Mutation(() => Comment)
	addComment(
		@Args('postId', { type: () => Int }) postId: number,
		@Args('content', { type: () => String }) content: string,
	): Comment {
		const newComment = this.commentsService.addComment(postId, content);
		this.pubSub.publish('commentAdded', { commentAdded: newComment });
		return newComment;
	}
}
