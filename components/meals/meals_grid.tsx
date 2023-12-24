import { Meal } from '@/lib/meals';
import MealItem from './meal_item';
import styles from './meals_grid.module.css';

interface MealsGridProps {
	meals: Meal[];
}

export default function MealsGrid({ meals }: MealsGridProps) {
	return (
		<ul className={styles.meals}>
			{meals.map((meal) => (
				<li key={meal.id}>
					<MealItem meal={meal} />
				</li>
			))}
		</ul>
	);
}
