import { Injectable } from '@nestjs/common';
import type { Post } from '../graphql';

export interface PostDbEntity {
	id: number;
	title: string;
	votes: number;
	authorId: number;
}

@Injectable()
export class PostsService {
	private posts: PostDbEntity[] = [
		{ id: 1, title: 'Post 1', votes: 0, authorId: 1 },
		{ id: 2, title: 'Post 2', votes: 0, authorId: 1 },
		{ id: 3, title: 'Post 3', votes: 0, authorId: 2 },
	];
	findByAuthorId(authorId: number): Post[] {
		return this.posts.filter((post) => post.authorId === authorId);
	}
	upvoteById(postId: number) {
		const post = this.posts.find((p) => p.id === postId);
		if (post) {
			post.votes = (post.votes || 0) + 1;
			return post;
		}
		throw new Error('Post not found');
	}
}
