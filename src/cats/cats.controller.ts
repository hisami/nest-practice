import { Body, Controller, Get, Post } from '@nestjs/common';
import { User, type UserType } from 'src/common/user.decorator';
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
	findAll(@User() user: UserType) {
		return this.catsService.findAll();
	}
}
