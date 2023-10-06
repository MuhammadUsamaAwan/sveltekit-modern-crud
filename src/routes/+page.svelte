<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<main>
	{#each data.posts as post}
		<h2>{post.title}</h2>
		<p>{post.body}</p>
		<form
			action="?/delete"
			method="POST"
			use:enhance={() => {
				// optimistic update
				const previousPosts = data.posts;
				data = {
					posts: previousPosts.filter((p) => p.id !== post.id)
				};
				return async ({ result }) => {
					// manual update wtihout optimistic update
					// @ts-ignore
					// if (result.data.success) {
					// 	data = {
					// 		posts: data.posts.filter((p) => p.id !== post.id)
					// 	};
					// }
					// check if the request was successful and rollback if not
					// @ts-ignore
					if (!result.data.success) {
						data = {
							posts: previousPosts
						};
					}
				};
			}}
		>
			<input type="hidden" value={post.id} name="id" />
			<button style="margin-bottom: 4rem">Delete Post</button>
		</form>
	{/each}
</main>
