import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { PubSubModule } from '../pubsub/pubsub.module';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';

@Module({
	imports: [PostsModule, PubSubModule],
	providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
