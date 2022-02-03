<script>
    import Counter from '../Components/Counter.svelte';
    import CounterMessage from '../Components/CounterMessage.svelte';
    let count = 0;
    
    function increment() {
        count ++;
    }

    function decrement() {
        count --;
    }
</script>

<h1>Homepage for Learning Svelte</h1>
<Counter count={count} increment={increment} decrement={decrement} />
<CounterMessage count={count} />
<style>
    h1 {
        text-align: center;
    }
</style>