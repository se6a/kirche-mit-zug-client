<script>
	let {crntNumber} = $props();

	let lastChange = 0;
	let displayNumber = $state(0);

	function runner() {
		const diff = Math.abs(crntNumber - displayNumber);
		if (diff === 0) return;

		if (crntNumber > displayNumber) {
			displayNumber += 1;
		} else if (crntNumber < displayNumber) {
			displayNumber -= 1;
		}
		setTimeout(() => runner(), Math.min(400 / diff, 50));
	}

	$effect(() => {
		if (lastChange === crntNumber) return;
		lastChange = crntNumber;
		runner();
	});
</script>

<span>
	{displayNumber}
</span>
