import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Comment, Post } from 'src/graphql';
import { CommentsService } from '../comments/comments.service';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
	constructor(
		private readonly commentsService: CommentsService,
		private readonly postsService: PostsService,
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

	@Mutation(() => Post)
	createPost(
		@Args('title', { type: () => String }) title: string,
		@Args('authorId', { type: () => Int }) authorId: number,
	): Post {
		return this.postsService.createPost(title, authorId);
	}
}
