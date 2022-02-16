<script>
  import Counter from "../Components/Counter.svelte";
  import CounterMessage from "../Components/CounterMessage.svelte";
  import { count, images } from '../Stores/Store.js';
  import ImageCards from '../Components/ImageCards.svelte';

  let countNumber;

  count.subscribe(c => {
		countNumber = c;
	});

  count.subscribe(c => {
    countNumber = c;
  });


  function increment() {
    count.update(c => c + 1)
  }

  function decrement() {
    count.update(c => c - 1)
  }

  function handleChange(event, id) {
    const copyImages= [...$images];
    const idx = copyImages.findIndex(c => c.id === id);
    copyImages[idx].title = event.target.value; 
    $images = copyImages;
  }
  
</script>

<h1>Home Svelte</h1>
<Counter count={countNumber} {increment} {decrement} />
<CounterMessage count={countNumber} />
<ImageCards  {handleChange} />
<style>
  h1 {
    text-align: center;
  }
</style>
