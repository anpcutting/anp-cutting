<script>
	import '../app.css';
	import '../hero-overrides.css';
	import '../quote-form.css';
	import '../products.css';
	import '../migration.css';
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/favicon.svg" /><meta name="theme-color" content="#fbf8f2" /></svelte:head>

{@render children()}
