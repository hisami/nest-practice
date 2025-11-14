import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserType = {
	id: string;
	username: string;
};

export const User = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): UserType => {
		const request = ctx.switchToHttp().getRequest();
		return { id: '1', username: 'testuser' };
	},
);
