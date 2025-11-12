import { Module } from '@nestjs/common';
import { CommentsModule } from '../comments/comments.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
	providers: [PostsService, PostsResolver],
	exports: [PostsService],
	imports: [CommentsModule],
})
export class PostsModule {}
