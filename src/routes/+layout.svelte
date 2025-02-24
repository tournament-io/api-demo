<script lang="ts">
	import "../app.css";
	import { apiToken } from '$lib/stores/api.store';
	import { page } from "$app/state";
</script>

<div class="min-h-screen bg-gray-100">
	{#if !$apiToken}
		<!-- if no api token, show "login" page -->
		<div class="flex min-h-screen items-center justify-center">
			<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
				<h2 class="mb-4 text-2xl font-bold">Tournament.io API Token</h2>
				<input
					type="text"
					placeholder="Enter your API token"
					class="w-full rounded border p-2"
					onchange={(e) => apiToken.set(e.currentTarget.value)}
				/>
			</div>
		</div>
	{:else}
		<!-- if api token, show "dashboard" page -->
		<nav class="bg-white shadow">
			<div class="mx-auto max-w-7xl px-4 py-4">
				<div class="flex justify-between">
					<div class="flex items-center gap-4">
						{#if page.url.pathname !== '/'}
							<a href="../" class="text-gray-600 hover:text-gray-900">←</a>
						{/if}
						<h1 class="text-xl font-bold">Tournament.io API Test</h1>
					</div>
					<button
						class="text-red-600"
						onclick={() => apiToken.set(null)}
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
		<main class="mx-auto max-w-7xl p-4">
			<slot />
		</main>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, sans-serif;
	}
</style> 
