import { StaticImageData } from 'next/image';
import MealItem from './meal_item';
import styles from './meals_grid.module.css';

type Meal = {
	id: string;
	title: string;
	slug: string;
	image: StaticImageData;
	summary: string;
	creator: string;
};

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
