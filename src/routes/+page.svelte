<script>
	import Search from '$lib/Search.svelte';

	let similarCards = [];

	async function fetchSimilarCards (card_id) {
		try {
			const response = await fetch(`http://localhost:8000/cards/${card_id}`);
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
	{#each similarCards as card}
		<div>{JSON.stringify(card)}</div>
	{/each}
</div>

<p>
	You can visit mtg-helper github <a href="https://github.com/Luvkitri/mtg-helper">page</a> for more
	info!
</p>
