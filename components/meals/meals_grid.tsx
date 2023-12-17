import { Props as MealItemProps } from './meal_item';
import MealItem from './meal_item';
import styles from './meals_grid.module.css';

interface Meal extends MealItemProps {
	id: string;
}

interface Props {
	meals: Array<Meal>;
}

export default function MealsGrid({ meals }: Props) {
	return (
		<ul className={styles.meals}>
			{meals.map((meal) => (
				<li key={meal.id}>
					<MealItem {...meal} />
				</li>
			))}
		</ul>
	);
}
