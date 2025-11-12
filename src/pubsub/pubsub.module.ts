import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

export const PUB_SUB = 'PUB_SUB';

const pubSubProvider = {
	provide: PUB_SUB,
	useValue: new PubSub(),
};

@Module({
	providers: [pubSubProvider],
	exports: [pubSubProvider],
})
export class PubSubModule {}
