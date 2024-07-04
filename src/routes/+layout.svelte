<script>
	import '../app.css';
</script>

<div class="relative box-border flex min-h-full flex-col">
	<header class="m-4 shrink-0 grow-0"></header>
	<main class="m-4 grow">
		<slot />
	</main>
	<footer class="m-4 flex shrink-0 grow-0 flex-col items-center gap-4">
		<div>
			<p>
				You can visit mtg-helper github <a href="https://github.com/Luvkitri/mtg-helper">page</a> for
				more info!
			</p>
		</div>
		<div>
			<a href="https://mtgjson.com" style="display: inline-flex; align-items: center;">
				<img
					src="https://mtgjson.com/images/assets/logo-mtgjson.svg"
					width="60px"
					alt="MTGJSON logo"
				/>
				<p style="margin-left: 10px">Powered by MTGJSON</p>
			</a>
		</div>
	</footer>
</div>
