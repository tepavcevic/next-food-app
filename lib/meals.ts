import fs from 'node:fs';
import sql, { Database as SQLiteDatabase } from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface Meal {
	title: string;
	summary: string;
	instructions: string;
	creator: string;
	creator_email: string;
}

export interface PayloadMeal extends Meal {
	image: File;
}

export interface DBMeal extends Meal {
	id: string;
	slug: string;
	image: string;
}

export interface Database {
	prepare: (query: string) => {
		all: () => DBMeal[];
		get: (slug: string) => DBMeal;
	};
}

const db: SQLiteDatabase = sql('meals.db');

export function getMeals(): DBMeal[] {
	const rows = db.prepare('SELECT * FROM meals;').all() || ([] as DBMeal[]);
	if (!Array.isArray(rows)) return [] as DBMeal[];

	return rows as DBMeal[];
}

export function getMeal(slug: string): DBMeal {
	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as DBMeal;
}

export async function saveMeal(meal: PayloadMeal) {
	const slug = slugify(meal.title, { lower: true });
	const instructions = xss(meal.instructions);

	const extension = meal.image.name.split('.').pop();
	const fileName = `${slug}.${extension}`;

	const stream = fs.createWriteStream(`public/images/${fileName}`);
	const bufferedImage = await meal.image.arrayBuffer();

	stream.write(Buffer.from(bufferedImage), (error) => {
		if (error) {
			throw new Error('Saving image failed');
		}
	});

	const preparedMeal = {
		...meal,
		slug,
		instructions,
		image: `/images/${fileName}`,
	};

	db.prepare(
		`INSERT INTO meals
		(title, summary, instructions, creator, creator_email, slug, image)
		VALUES
		(@title, @summary, @instructions, @creator, @creator_email, @slug, @image);`
	).run(preparedMeal);
}
