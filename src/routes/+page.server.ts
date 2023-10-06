export const load = async ({ fetch }) => {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await res.json();
	return {
		posts: posts as { id: number; title: string; body: string; userId: number }[]
	};
};

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: 'DELETE'
		});
		return {
			success: res.ok
		};
	}
};
