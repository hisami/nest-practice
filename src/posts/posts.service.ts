import { Injectable } from '@nestjs/common';
import type { Post } from '../graphql';

@Injectable()
export class PostsService {
	private posts: Post[] = [
		{ id: 1, title: 'Post 1', votes: 0 },
		{ id: 2, title: 'Post 2', votes: 0 },
		{ id: 3, title: 'Post 3', votes: 0 },
	];
	upvoteById(postId: number) {
		const post = this.posts.find((p) => p.id === postId);
		if (post) {
			post.votes = (post.votes || 0) + 1;
			return post;
		}
		throw new Error('Post not found');
	}
}
