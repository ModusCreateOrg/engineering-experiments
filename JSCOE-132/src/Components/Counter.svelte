<script>
    export let count, decrement, increment;
</script>
<div class="counter-section">
    <h2>Counter</h2>
    <div class="row">
        <div class="button-group">
            <button on:click={increment}>
                Add
            </button>
            <button on:click={decrement}>
                minus
            </button>
        </div>
        <div class="section">
            <h3>Total:{count}</h3>
        </div>
    </div>    
</div>


<style>
    h2 {
        text-align: center;
    }

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