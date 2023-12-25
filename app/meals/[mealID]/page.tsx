import Image from 'next/image';

import { getMeal } from '@/lib/meals';
import styles from './page.module.css';

export default function MealDetailsPage({
	params: { mealID },
}: {
	params: { mealID: string };
}) {
	const meal = getMeal(mealID);

	return (
		<>
			<header className={styles.header}>
				<div className={styles.image}>
					<Image src={meal.image} alt="Image of the meal" fill={true} />
				</div>
				<div className={styles.headerText}>
					<h1>{meal?.title}</h1>
					<p className={styles.creator}>
						by <a href={`mailto:${meal?.creator_email}`}>{meal.creator}</a>
					</p>
					<p className={styles.summary}>{meal?.summary}</p>
				</div>
			</header>
			<main>
				<p
					className={styles.instructions}
					dangerouslySetInnerHTML={{
						__html: meal.instructions,
					}}
				></p>
			</main>
		</>
	);
}
