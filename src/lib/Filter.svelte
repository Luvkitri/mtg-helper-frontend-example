<script>
	export let setFilterData;

	/** @type {boolean}*/
	let filterColor = false;

	/** @type {boolean}*/
	let filterType = false;

	$: setFilterData({ filterColor, filterType });
</script>

<div class="relative flex justify-center gap-4 px-4">
	<div class="align-center flex gap-2">
		<label for="filter-color">Matching Card Color</label>
		<input name="filter-color" type="checkbox" bind:checked={filterColor} />
	</div>
	<div class="align-center flex gap-2">
		<label for="filter-type">Matching Card Type</label>
		<input name="filter-type" type="checkbox" bind:checked={filterType} />
	</div>
</div>
