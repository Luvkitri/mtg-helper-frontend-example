<script>
	import '../app.css';
</script>

<div class="flex flex-col p-12 h-full relative">
	<slot />
	<div class="flex flex-col gap-4 items-center m-4">
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
	</div>
</div>
