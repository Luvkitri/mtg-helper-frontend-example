<script>
	/** @type {import('$lib/types').FilterData}*/
	export let filterData;
	const { filterColor, filterType } = filterData;
</script>

<div class="relative flex justify-center gap-4 px-4">
	<div class="align-center flex gap-2">
		<label for="filter-color">Matching Card Color</label>
		<input
			name="filter-color"
			type="checkbox"
			bind:checked={filterData.filterColor}
			value={filterColor}
		/>
	</div>
	<div class="align-center flex gap-2">
		<label for="filter-type">Matching Card Type</label>
		<input
			name="filter-type"
			type="checkbox"
			bind:checked={filterData.filterType}
			value={filterType}
		/>
	</div>
</div>
