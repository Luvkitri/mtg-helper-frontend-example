<script>
	/** @type {string[]} */
	let autocompleteSuggestions = [];
	let query = '';

	async function fetchAutocompleteSuggestions() {
		if (!query) {
			autocompleteSuggestions = [];
			return;
		}
		try {
			const response = await fetch(`http://localhost:8000/autocomplete/cards?q=${query}`);
			/** @type {import('$lib/types').AutocompleteSuggestion[]} */
			const data = await response.json();
			console.log(data);
			autocompleteSuggestions = data.map((suggestion) => suggestion.name) || [];
		} catch (error) {
			console.error(error);
		}
	}

	function debounce(callback, delay) {
		let timeout;

		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => callback(...args), delay);
		};
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
		on:keyup={debounce(() => fetchAutocompleteSuggestions(), 300)}
	/>
	{#if autocompleteSuggestions.length > 0}
		<div class="z-0 -mt-4 border-x border-b border-gray-300 pt-4 flex flex-col">
			{#each autocompleteSuggestions as suggestion}
				<button
					class="cursor-pointer rounded-md p-2 hover:bg-blue-50"
					on:click={() => (query = suggestion)}><p class="ml-2">{suggestion}</p></button
				>
			{/each}
		</div>
	{/if}
</div>
