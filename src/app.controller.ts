import { Controller, Get, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
// biome-ignore lint/style/useImportType: NestJS の DI では値インポートが必要
import { AppService } from './app.service';

export type RequestWithUrl = Pick<Request, 'url'>;

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('hello')
	getHello(@Req() request: RequestWithUrl): string {
		console.log('Request URL:', request.url);
		return this.appService.getHello();
	}

	@Get('age')
	getAll(@Query('age') age: number): string {
		return `${age}歳です`;
	}
}
