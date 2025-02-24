<script lang="ts">
  import { page } from '$app/state';
  import type { Court } from '$lib/api/tio-dtos';
  import { getDisplayScore, getEntryName } from '$lib/api/tio-helper';
	import { api } from '$lib/stores/api.store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	const tournamentId = $state(page.params.id);
	let courts = $state<Court[]>([]);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			const tioApi = get(api);
			courts = await tioApi.getCourts(tournamentId);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load courts data';
		}
	});
</script>

<div class="space-y-6">
	{#if error}
		<div class="rounded bg-red-100 p-4 text-red-700">
			{error}
		</div>
	{:else if courts.length === 0}
		<div class="rounded bg-gray-100 p-4 text-gray-700">
			Loading courts...
		</div>
	{:else}
		<div class="space-y-4">
			<h3 class="text-xl font-semibold">Courts</h3>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each courts as court}
					<a href={`/tournament/${tournamentId}/court/${court.id}`} class="rounded-lg bg-white p-6 shadow">
						<div class="mb-4 flex items-center justify-between">
							<h4 class="text-lg font-semibold">Court {court.name}</h4>
							{#if court.currentMatch}
								<span class="rounded bg-green-100 px-2 py-1 text-sm text-green-800">Running</span>
							{:else}
								<span class="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">Free</span>
							{/if}
						</div>

						{#if court.currentMatch}
							<div class="space-y-2">
								<div class="text-sm text-gray-600">
									{court.currentMatch.disciplineName} - {court.currentMatch.roundName}
								</div>
								<div class="flex items-center justify-between text-sm">
									<span class="font-medium">{getEntryName(court.currentMatch.entries[0])}</span>
									{#if court.currentMatch.encounters?.length > 0 && court.currentMatch.encounters[0]?.length > 0}
										<span class="mx-2 font-bold">{getDisplayScore(court.currentMatch)}</span>
									{:else}
										<span class="mx-2 text-gray-500">vs</span>
									{/if}
									<span class="font-medium">{getEntryName(court.currentMatch.entries[1])}</span>
								</div>
								<div class="mt-2 text-sm text-gray-500">
									Started: {new Date(court.currentMatch.startTime ?? '').toLocaleTimeString()}
								</div>
							</div>
						{:else}
							<p class="text-gray-600">No match currently running</p>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div> 