<script>
	import { env } from '$env/dynamic/public';
	import Search from '$lib/Search.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import Filter from '$lib/Filter.svelte';

	/** @type string | undefined*/
	let selectedCardId;

	/** @type {import('$lib/types').Card[]}*/
	let similarCards = [];

	/** @type {import('$lib/types').PaginationData} */
	let paginationData = {
		total: 0,
		page: 1,
		pageCount: 0,
		limit: 10,
		offset: 0
	};

	/** @type {import('$lib/types').FilterData} */
	let filterData = {
		filterColor: false,
		filterType: false
	};

	/**
	 * @param {import('$lib/types').FilterData} newFilterData
	 * @returns void
	 */
	const setFilterData = (newFilterData) => {
		filterData = newFilterData;
	};

	/**
	 * @param {string} cardId
	 * @returns void
	 */
	const setSelectedCardId = (cardId) => {
		selectedCardId = cardId;
	};

	$: if (selectedCardId) {
		fetchSimilarCards();
	}

	const fetchSimilarCards = async () => {
		try {
			const response = await fetch(
				`${env.PUBLIC_API_URL}/cards/similar/${selectedCardId}` +
					`?limit=${paginationData.limit}` +
					`&offset=${paginationData.offset}` +
					`&filter_color=${filterData.filterColor}` +
					`&filter_type=${filterData.filterType}`
			);
			const responseData = await response.json();
			similarCards = responseData.data;
			paginationData.limit = responseData.limit;
			paginationData.offset = responseData.offset;
			paginationData.total = responseData.total;
			paginationData.pageCount = Math.ceil(paginationData.total / paginationData.limit);
		} catch (error) {
			console.error(error);
		}
	};

	/**
	 * @param {number} nextPage
	 * @returns Promise<void>}
	 */
	const setPage = async (nextPage) => {
		try {
			if (nextPage > paginationData.pageCount || nextPage < 0) {
				return;
			}

			paginationData.page = nextPage;
			paginationData.offset = (paginationData.page - 1) * paginationData.limit;
			await fetchSimilarCards();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="flex w-full flex-col items-center">
	<h1 class="text-3xl font-bold">MTG Helper</h1>
	<div class="flex w-[44rem] flex-col gap-4 p-4">
		<Search {setSelectedCardId} />
		<Filter {setFilterData} />
	</div>
	<div class="grid grid-cols-5 gap-4 py-2">
		{#each similarCards as card}
			<div>
				<img
					width="250"
					src={`https://cards.scryfall.io/normal/front/${card.scryfallId[0]}/${card.scryfallId[1]}/${card.scryfallId}.jpg`}
					alt={`card-${card.uuid}`}
				/>
			</div>
		{/each}
	</div>
	<Pagination {paginationData} {setPage} />
</div>
