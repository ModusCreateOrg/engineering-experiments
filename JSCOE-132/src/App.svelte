<script>
	import HomePage from "./Pages/HomePage.svelte"
	import Navbar from "./Components/Navbar.svelte";
</script>

<main>
	<div class="container">
		<HomePage/>
	</div>
</main>


<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</svelte:head>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		/* this will apply to <body> */
		margin: 0;
        padding: 0;
        background: #1A1A40;
		min-height: 100vh;
        font-family: 'Poppins', sans-serif;
		color: rgb(255, 253, 253);

	}

	.container {
		max-width: 1100px;
		margin: 0px auto;
	}

</style>