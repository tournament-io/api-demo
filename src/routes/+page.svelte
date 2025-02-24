<script lang="ts">
  import { fetchTournaments, tournaments } from '$lib/stores/tournament.store';
  import { onMount } from 'svelte';

  onMount(() => {
    fetchTournaments();
  });

  $effect(() => {
    fetchTournaments();
  });
</script>

<h1>Running Tournaments</h1>

{#if $tournaments.length === 0}
  <p>No running tournaments found.</p>
{:else}
  <div class="tournaments-grid">
    {#each $tournaments as tournament}
      <a href={`/tournament/${tournament.id}`} class="tournament-card">
        <h2>{tournament.name}</h2>
        
        <p>Status: {tournament.state}</p>
        <p>Date: {new Date(tournament.date).toLocaleDateString()}</p>
        <p>Players: {tournament.numPlayers}</p>
        <p>Teams: {tournament.numTeams}</p>
        
        {#if tournament.disciplines}
          <div class="disciplines">
            {#each tournament.disciplines as discipline}
              <span class="discipline">{discipline.name} ({discipline.shortName})</span>
            {/each}
          </div>
        {/if}

      </a>
    {/each}
  </div>
{/if}

<style>
  .tournaments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .tournament-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .tournament-card h2 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .tournament-card p {
    margin: 0.5rem 0;
    color: #666;
  }

  .disciplines {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .discipline {
    background: #f0f0f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }
</style>
