<script>
	import Search from '$lib/Search.svelte';
	import Pagination from '$lib/Pagination.svelte';

	let similarCards = [];

	async function fetchSimilarCards (card_id) {
		try {
			const response = await fetch(`http://localhost:8000/cards/similar/${card_id}`);
			const responseData = await response.json();
			similarCards = responseData.data;
			console.log(responseData.metadata);
		} catch (error) {
			console.error(error);
		}
	}

</script>


<div class="flex flex-col items-center w-full">
	<h1 class="text-3xl font-bold">MTG Helper</h1>
	<div class="w-96 flex p-4">
		<Search fetchSimilarCards ={fetchSimilarCards } />
	</div>
	<div class="grid grid-cols-5 gap-4">
		{#each similarCards as card}
			<div><img width="250" src={`https://cards.scryfall.io/normal/front/${card.scryfallId[0]}/${card.scryfallId[1]}/${card.scryfallId}.jpg`} alt={`card-${card.uuid}`}/></div>
		{/each}
	</div>
	<Pagination />
</div>

<p>
	You can visit mtg-helper github <a href="https://github.com/Luvkitri/mtg-helper">page</a> for more
	info!
</p>
