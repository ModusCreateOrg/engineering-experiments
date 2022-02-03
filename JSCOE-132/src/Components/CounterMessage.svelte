<script>
    export let count;
</script>

<p> 
    {count}
    The current count is {count >= 0 ? 'greater than or equal to 0' : 'less than 0'}.
</p>

<style>
    p {
        text-align: center;
    }
</style>