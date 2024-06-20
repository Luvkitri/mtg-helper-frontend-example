<script>
  export let page;
  export let pageCount;
  export let setPage;
</script>

{#if pageCount > 0}
  <div class="flex items-center gap-2 p-4">
    <button class="border rounded w-12 h-12" type="button" on:click={() => setPage(1)}>&lt;&lt;</button>
    <button class="border rounded w-12 h-12" type="button" on:click={() => setPage(page - 1)}>&lt;</button>
    <div class="flex items-center justify-center w-24 h-12">{page} out of {pageCount}</div>
    <button class="border rounded w-12 h-12" type="button" on:click={() => setPage(page + 1)}>&gt;</button>
    <button class="border rounded w-12 h-12" type="button" on:click={() => setPage(pageCount)}>&gt;&gt;</button>
  </div>
{/if}
