<script>
	export let fetchSimilarCards;
	/** @type {string[]} */
	let autocompleteSuggestions = [];
	let query = '';

	async function fetchAutocompleteSuggestions(event) {
		if (!query || query.length < 2) {
			autocompleteSuggestions = [];
			return;
		}

		if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
			event.preventDefault();
		}

		try {
			const response = await fetch(`http://localhost:8000/autocomplete/cards?q=${query}`);
			/** @type string[] */
			const data = await response.json();
			autocompleteSuggestions = data || [];
		} catch (error) {
			console.error(error);
		}
	}

	function debounce(callback, delay, event) {
		/** @type number | undefined */
		let timeout = undefined;

		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(callback, delay, ...args);
		};
	}

	async function handleAutocompleteElementClick(card_id, card_name) {
		query = card_name;
		autocompleteSuggestions = [];
		await fetchSimilarCards(card_id);
	}
</script>

<div class="flex flex-col w-full">
	<input
		name="search"
		type="text"
		autocomplete="off"
		placeholder="Search..."
		class="z-10 rounded-lg border border-gray-300 p-4 hover:border-blue-500 focus:border-blue-500 focus:outline-none"
		bind:value={query}
		on:keyup={debounce(fetchAutocompleteSuggestions, 300)}
		
	/>
	{#if Object.values(autocompleteSuggestions).length > 0}
		<div class="z-0 -mt-4 border-x border-b border-gray-300 pt-4 flex flex-col">
			{#each Object.entries(autocompleteSuggestions) as [id, suggestion]}
				<button
					class="cursor-pointer rounded-md p-2 hover:bg-blue-50"
					on:click={() => handleAutocompleteElementClick(id, suggestion)}><p class="ml-2">{suggestion}</p></button
				>
			{/each}
		</div>
	{/if}
</div>
