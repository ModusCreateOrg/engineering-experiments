<script>
    import Counter from '../Components/Counter.svelte';
    let count = 0;
</script>

<h1>Homepage for Learning Svelte</h1>
<Counter count={count} />

<style>
    h1 {
        text-align: center;
    }
</style>