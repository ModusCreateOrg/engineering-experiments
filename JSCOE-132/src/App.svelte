<script>
	import HomePage from "./Pages/HomePage.svelte"
	import Navbar from "./Components/Navbar.svelte";
</script>


<HomePage/>


<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<style>
	:global(body) {
		/* this will apply to <body> */
		margin: 0;
        padding: 0;
        background: black;
        font-family: 'Press Start 2P', cursive;
	}

</style>