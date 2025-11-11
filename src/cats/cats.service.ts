import { Injectable } from '@nestjs/common';

export interface Cats {
	name: string;
	age: number;
	breed: string;
}

@Injectable()
export class CatsService {
	private readonly cats: Cats[] = [];

	create(cat: Cats) {
		this.cats.push(cat);
	}

	findAll(): Cats[] {
		return this.cats;
	}
}
