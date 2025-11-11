import { Body, Controller, Get, Post } from '@nestjs/common';
// biome-ignore lint/style/useImportType: NestJS の DI では値インポートが必要
import { CatsService } from './cats.service';
import type { CreateCatsDto } from './create-cats.dto';

@Controller('cats')
export class CatsController {
	constructor(private readonly catsService: CatsService) {}

	@Post()
	create(@Body() createCatsDto: CreateCatsDto) {
		this.catsService.create(createCatsDto);
	}

	@Get()
	findAll() {
		return this.catsService.findAll();
	}
}
