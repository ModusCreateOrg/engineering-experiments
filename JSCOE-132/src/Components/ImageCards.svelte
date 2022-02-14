<script>

    import  { images } from '../Stores/Store'
  
    function handleChange(event, id) {

        const copyImages= [...$images];
        const idx = copyImages.findIndex(c => c.id === id);
        copyImages[idx].title = event.target.value; 
        $images = copyImages;

    }
</script>
<h1>Here you can the title of the cards and it will update!</h1>
<div class="cars">
	{#each $images as { title, image, id} }
		<div class="outer-div">
            <div>
                <input type="text" on:change={(e) => handleChange(e, id)} value={title} />
                <img src={image} alt={title} />
            </div>
		</div>
	{/each}
</div>

<style>
    input {
        color: #000;
        text-align: center;
        font-size: 18px;
        width: 100%;
    }

    .cars {
        display: flex;
    }
    .outer-div {
        padding: 10px;
        width: 25%;
    }

    .outer-div div {
        padding: 5px;
        background: #fff;
    }

    img {
        height: 300px;
        width: 100%;
        object-fit: cover;
        padding: 5px;
    }
</style>