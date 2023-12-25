'use server';

import { redirect } from 'next/navigation';
import { PayloadMeal, saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

export interface ShareMealState {
	message: string | null;
}

function isInvalidText(text: string): boolean {
	return !text || text.trim() === '';
}

export async function shareMeal(
	prevState: ShareMealState,
	formData: FormData
): Promise<ShareMealState> {
	'use server';

	const meal = {
		title: formData.get('title'),
		summary: formData.get('summary'),
		instructions: formData.get('instructions'),
		creator: formData.get('name'),
		creator_email: formData.get('email'),
		image: formData.get('image'),
	} as PayloadMeal;

	if (
		isInvalidText(meal.title) ||
		isInvalidText(meal.creator) ||
		isInvalidText(meal.creator_email) ||
		isInvalidText(meal.instructions) ||
		isInvalidText(meal.summary) ||
		!meal.creator_email.includes('@') ||
		!meal.image ||
		meal.image.size === 0
	) {
		return { message: 'Invalid input.' };
	}

	await saveMeal(meal);
	revalidatePath('/meals');
	redirect('/meals');
}
