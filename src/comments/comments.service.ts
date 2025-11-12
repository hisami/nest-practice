import { Injectable } from '@nestjs/common';
import { Comment } from 'src/graphql';

@Injectable()
export class CommentsService {
	addComment(postId: number, content: string): Comment {
		const newComment: Comment = {
			id: Math.floor(Math.random() * 1000),
			content: content,
		};
		return newComment;
	}
}
