import sql, { Database as SQLiteDatabase } from 'better-sqlite3';

export interface Meal {
	id: string;
	title: string;
	slug: string;
	image: string;
	summary: string;
	instructions: string;
	creator: string;
	creator_email: string;
}

export interface Database {
	prepare: (query: string) => {
		all: () => Meal[];
		get: (slug: string) => Meal;
	};
}

const db: SQLiteDatabase = sql('meals.db');

export function getMeals(): Meal[] {
	const rows = db.prepare('SELECT * FROM meals;').all() || ([] as Meal[]);
	if (!Array.isArray(rows)) return [] as Meal[];

	return rows as Meal[];
}

export function getMeal(slug: string): Meal {
	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal;
}
