import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CatService } from './cat.service';
import type { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
	constructor(private readonly catService: CatService) {}

	@Post()
	create(@Body() createCatDto: CreateCatDto) {
		this.catService.create(createCatDto);
	}

	@Get()
	findAll() {
		return this.catService.findAll();
	}
}
