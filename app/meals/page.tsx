import Link from 'next/link';

import styles from './page.module.css';
import MealsGrid from '@/components/meals/meals_grid';
import { getMeals, Meal } from '@/lib/meals';

export default function MealsPage() {
	const meals: Meal[] = getMeals();
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
				<MealsGrid meals={meals} />
			</main>
		</>
	);
}
