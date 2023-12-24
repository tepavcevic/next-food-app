import sql, { Database } from 'better-sqlite3';

export type Meal =
	| {
			id: string;
			title: string;
			slug: string;
			image: string;
			summary: string;
			instructions: string;
			creator: string;
			creator_email: string;
	  }
	| any;

const db: Database = sql('meals.db');

export function getMeals(): Meal[] {
	return db.prepare('SELECT * FROM meals;').all() || [];
}
