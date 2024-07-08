<script>
	import { env } from '$env/dynamic/public';
	import { clickOutside } from '$lib/utils/clickOutside';

	/**
	 * @type {Function}
	 */
	export let setSelectedCardId;

	/** @type {string[]} */
	let autocompleteSuggestions = [];
	let query = '';
	let isAutocompleteSuggestionOpen = false;
	/**
	 * @param {Event} event
	 * @returns Promise<void>
	 */
	async function fetchAutocompleteSuggestions(event) {
		if (!query || query.length < 2) {
			autocompleteSuggestions = [];
			return;
		}

		if (
			'keyCode' in event &&
			(event.keyCode == 13 ||
				event.keyCode == 37 ||
				event.keyCode == 38 ||
				event.keyCode == 39 ||
				event.keyCode == 40)
		) {
			event.preventDefault();
			return;
		}

		try {
			const response = await fetch(`${env.PUBLIC_API_URL}/autocomplete/cards?q=${query}`);
			/** @type string[] */
			const data = await response.json();
			autocompleteSuggestions = data || [];
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * @param {any} callback
	 * @param {number} delay
	 * @returns void
	 */
	function debounce(callback, delay) {
		/** @type number | undefined */
		let timeout = undefined;

		return (/** @type {any} */ ...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(callback, delay, ...args);
		};
	}

	/**
	 * @param {string} cardId
	 * @param {string} cardName
	 * @returns void
	 */
	function handleAutocompleteElementClick(cardId, cardName) {
		query = cardName;
		autocompleteSuggestions = [];
		setSelectedCardId(cardId);
	}

	function handleClickOutside() {
		isAutocompleteSuggestionOpen = false;
	}

	function handleOnInputClick() {
		isAutocompleteSuggestionOpen = true;
	}

	function handleInputKeyDown(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			return false;
		}
	}

	$: console.log(autocompleteSuggestions, isAutocompleteSuggestionOpen);
</script>

<div class="relative flex w-full flex-col" use:clickOutside on:click_outside={handleClickOutside}>
	<input
		name="search"
		type="text"
		autocomplete="off"
		placeholder="Search..."
		class="z-20 rounded-lg border border-gray-300 p-4 hover:border-sky-700 focus:border-sky-700 focus:outline-none"
		bind:value={query}
		on:keyup={debounce(fetchAutocompleteSuggestions, 300)}
		on:click={handleOnInputClick}
		on:keydown={handleInputKeyDown}
	/>
	{#if isAutocompleteSuggestionOpen && Object.values(autocompleteSuggestions).length > 0}
		<p>WHY NOT?</p>
		<div
			class="absolute z-10 mt-11 flex w-full flex-col border-x border-b border-gray-300 bg-white pt-4"
		>
			{#each Object.entries(autocompleteSuggestions) as [id, suggestion]}
				<button
					class="cursor-pointer rounded-md p-2 hover:bg-blue-50"
					on:click={() => handleAutocompleteElementClick(id, suggestion)}
					><p class="ml-2">{suggestion}</p></button
				>
			{/each}
		</div>
	{/if}
</div>
