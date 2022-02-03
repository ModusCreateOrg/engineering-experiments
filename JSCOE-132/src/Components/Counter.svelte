<script>
    export let count;
</script>

<div class="row">
    <div class="button-group">
        <button on:click={() => count++}>
            Add
        </button>
        <button on:click={() => count--}>
            minus
        </button>
    </div>
    <div class="section">
        <h2>Total:{count}</h2>
    </div>
</div>


<style>
    button {
        padding: 5px 10px;
        border: 0;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    }

    .button-group {
        display: flex;
        justify-content: space-around;
        width: 50%;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .section {
        text-align: center;
        width: 50%;
    }

</style>