import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import styles from './meal_item.module.css';
import { DBMeal } from '@/lib/meals';

interface MealItemProps {
	meal: DBMeal;
}

export default function MealItem({ meal }: MealItemProps) {
	return (
		<article className={styles.meal}>
			<header>
				<div className={styles.image}>
					<Image src={meal.image} alt={meal.title} fill />
				</div>
				<div className={styles.headerText}>
					<h2>{meal.title}</h2>
					<p>by {meal.creator}</p>
				</div>
			</header>
			<div className={styles.content}>
				<p className={styles.summary}>{meal.summary}</p>
				<div className={styles.actions}>
					<Link href={`/meals/${meal?.slug}`}>View Details</Link>
				</div>
			</div>
		</article>
	);
}
