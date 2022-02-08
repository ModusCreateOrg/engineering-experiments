<script>
  import Counter from "../Components/Counter.svelte";
  import CounterMessage from "../Components/CounterMessage.svelte";

  let count = 0;

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }
  
</script>

<h1>Home Svelte</h1>
<Counter {count} {increment} {decrement} />
<CounterMessage {count} />
<style>
  h1 {
    text-align: center;
  }
</style>
