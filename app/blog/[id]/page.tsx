import type {} from 'next';

export default function BlogPostPage({ params }: { params: { id: string } }) {
	return (
		<main>
			<h1>Blog postttttt</h1>
			<p>{params.id}</p>
		</main>
	);
}
