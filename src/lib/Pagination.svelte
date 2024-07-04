<script>
	/** @type {import('$lib/types').PaginationData}*/
	export let paginationData;
	export let setPage;
	let { page, pageCount } = paginationData;
</script>

{#if pageCount > 0}
	<div class="flex items-center gap-2 p-4">
		<button class="h-12 w-12 rounded border" type="button" on:click={() => setPage(1)}
			>&lt;&lt;</button
		>
		<button class="h-12 w-12 rounded border" type="button" on:click={() => setPage(page - 1)}
			>&lt;</button
		>
		<div class="flex h-12 w-24 items-center justify-center">{page} out of {pageCount}</div>
		<button class="h-12 w-12 rounded border" type="button" on:click={() => setPage(page + 1)}
			>&gt;</button
		>
		<button class="h-12 w-12 rounded border" type="button" on:click={() => setPage(pageCount)}
			>&gt;&gt;</button
		>
	</div>
{/if}
