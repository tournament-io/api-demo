<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/stores/api.store';
	import { get } from 'svelte/store';
	import type { Match } from '$lib/api/tio-dtos';
    import { getEntryName } from '$lib/api/tio-helper';

	const tournamentId = $state($page.params.id);
	const courtId = $state($page.params.courtId);
	
	let match = $state<Match | null>(null);
	let error = $state<string | null>(null);
	let updating = $state(false);

	const tioApi = get(api);

	// Fetch the match data from the API
	async function loadMatch() {
		try {
			const court = await tioApi.getCourt(tournamentId, courtId);
			match = court.currentMatch ?? null;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load match data';
		}
	}

	// Click handler for the score update buttons
	async function handleScoreUpdate(team: 'team1' | 'team2', delta: number) {
		if (!match || updating) return;

		try {	
			updating = true;
			let leftScore = match.encounters[0]?.[0]?.[0] ?? 0;
			let rightScore = match.encounters[0]?.[0]?.[1] ?? 0;
			if (team === 'team1') {
				leftScore = Math.max(0, leftScore + delta);
			} else {
				rightScore = Math.max(0, rightScore + delta);
			}
		
			match = await tioApi.setLiveMatchResult(tournamentId, match.id, {
				result: [[[leftScore, rightScore]]]
			});
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to update score';
		} finally {
			updating = false;
		}
	}

	onMount(async () => {
		await loadMatch();
	});
</script>

<div class="space-y-6">
	{#if error}
		<div class="rounded bg-red-100 p-4 text-red-700">
			{error}
		</div>
	{:else if !match}
		<div class="rounded bg-gray-100 p-4 text-gray-700">
			Loading match...
		</div>
	{:else}
		<div class="rounded-lg bg-white p-8 shadow-lg">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-2xl font-bold">Match Details</h2>
				<span class="rounded bg-blue-100 px-3 py-1 text-blue-800">
					{match.state}
				</span>
			</div>

			<div class="grid gap-8 sm:grid-cols-2">
				<!-- Team 1 -->
				<div class="space-y-4 text-center">
					<h3 class="text-xl font-semibold">{getEntryName(match.entries[0])}</h3>
					<div class="flex items-center justify-center space-x-4">
						<button
							class="rounded-full bg-red-100 p-2 text-red-800 disabled:opacity-50"
							onclick={() => handleScoreUpdate('team1', -1)}
							disabled={updating || match.state !== 'running'}
						>
							-
						</button>
						<span class="text-4xl font-bold">{match.displayScore?.[0] ?? 0}</span>
						<button
							class="rounded-full bg-green-100 p-2 text-green-800 disabled:opacity-50"
							onclick={() => handleScoreUpdate('team1', 1)}
							disabled={updating || match.state !== 'running'}
						>
							+
						</button>
					</div>
				</div>

				<!-- Team 2 -->
				<div class="space-y-4 text-center">
					<h3 class="text-xl font-semibold">{getEntryName(match.entries[1])}</h3>
					<div class="flex items-center justify-center space-x-4">
						<button
							class="rounded-full bg-red-100 p-2 text-red-800 disabled:opacity-50"
							onclick={() => handleScoreUpdate('team2', -1)}
							disabled={updating || match.state !== 'running'}
						>
							-
						</button>
						<span class="text-4xl font-bold">{match.displayScore?.[1] ?? 0}</span>
						<button
							class="rounded-full bg-green-100 p-2 text-green-800 disabled:opacity-50"
							onclick={() => handleScoreUpdate('team2', 1)}
							disabled={updating || match.state !== 'running'}
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div> 