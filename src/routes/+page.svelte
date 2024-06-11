<script>
	import Search from '$lib/Search.svelte';

	let similarCards = [];

	async function fetchSimilarCards (card_id) {
		try {
			const response = await fetch(`http://localhost:8000/cards/similar/${card_id}`);
			similarCards = await response.json();
			
		} catch (error) {
			console.error(error);
		}
	}

</script>


<div class="flex flex-col items-center w-full">
	<h1 class="text-3xl font-bold">MTG Helper</h1>
	<div class="w-96 flex">
		<Search fetchSimilarCards ={fetchSimilarCards } />
	</div>
	<div class="grid grid-cols-4 gap-4">
		{#each similarCards as card}
			<div><img src={`https://cards.scryfall.io/small/front/${card.scryfallId[0]}/${card.scryfallId[1]}/${card.scryfallId}.jpg`} alt={`card-${card.uuid}`}/></div>
		{/each}
	</div>
</div>

<p>
	You can visit mtg-helper github <a href="https://github.com/Luvkitri/mtg-helper">page</a> for more
	info!
</p>
