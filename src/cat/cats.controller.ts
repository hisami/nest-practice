import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import type { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
	@Post()
	create(@Body() createCatDto: CreateCatDto) {
		return 'This action adds a new cat';
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return `This action returns a #${id} cat`;
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return `This action removes a #${id} cat`;
	}
}
