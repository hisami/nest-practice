import { Injectable } from '@nestjs/common';
import type { Author } from '../graphql';

@Injectable()
export class AuthorsService {
	private readonly authors: Author[] = [
		{ id: 1, firstName: 'Tom', lastName: 'Coleman', posts: [] },
		{ id: 2, firstName: 'Sashko', lastName: 'Stubailo', posts: [] },
	];

	findById(id: number): Author | undefined {
		return this.authors.find((author) => author.id === id);
	}
}
