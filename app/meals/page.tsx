import Link from 'next/link';

import styles from './page.module.css';
import MealsGrid from '@/components/meals/meals_grid';
import { getMeals, Meal } from '@/lib/meals';
import { Suspense } from 'react';

function Meals() {
	const meals = getMeals();

	return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
	return (
		<>
			<header className={styles.header}>
				<h1>
					Delicious meals, created{' '}
					<span className={styles.highlight}>by you</span>
				</h1>
				<p>
					Choose yor favourite recipe and prepare it yourself. It&apos;s easy
					and fun!
				</p>

				<p className={styles.cta}>
					<Link href="/meals/share">Share Your Favourite Recipe</Link>
				</p>
			</header>
			<main className={styles.main}>
				<Suspense
					fallback={<p className={styles.loading}>Fetching meals...</p>}
				>
					<Meals />
				</Suspense>
			</main>
		</>
	);
}
