<script>
	import { PUBLIC_API_URL } from "$env/static/public";
	import Search from '$lib/Search.svelte';
	import Pagination from '$lib/Pagination.svelte';

	let selectedCardId;
	let similarCards = [];
	let total = 0;
	let page = 1;
	let pageCount = 0;
	let limit = 10;
	let offset = 0;

	function setSelectedCardId(card_id) {
		selectedCardId = card_id;
 	}

 	$: if (selectedCardId) {
 		fetchSimilarCards();
 	}
	
	async function fetchSimilarCards() {
		try {
			const response = await fetch(`${PUBLIC_API_URL}/cards/similar/${selectedCardId}?limit=${limit}&offset=${offset}`);
			const responseData = await response.json();
			similarCards = responseData.data;
			limit = responseData.limit;
			offset = responseData.offset;
			total = responseData.total

			pageCount = Math.ceil(total / limit); 
		} catch (error) {
			console.error(error);
		}
	}

	async function setPage(nextPage) {
		try {
			if (nextPage > pageCount || nextPage < 0) {
				return;
			}
			
			page = nextPage;
			offset = (page - 1) * limit;
			await fetchSimilarCards();
		} catch (error) {			
			console.error(error);
		}
	} 
</script>


<div class="flex flex-col items-center w-full">
	<h1 class="text-3xl font-bold">MTG Helper</h1>
	<div class="w-96 flex p-4">
		<Search setSelectedCardId={setSelectedCardId} />
	</div>
	<div class="grid grid-cols-5 gap-4">
		{#each similarCards as card}
			<div><img width="250" src={`https://cards.scryfall.io/normal/front/${card.scryfallId[0]}/${card.scryfallId[1]}/${card.scryfallId}.jpg`} alt={`card-${card.uuid}`}/></div>
		{/each}
	</div>
	<Pagination page={page} pageCount={pageCount} setPage={setPage} />
</div>

<p>
	You can visit mtg-helper github <a href="https://github.com/Luvkitri/mtg-helper">page</a> for more
	info!
</p>
