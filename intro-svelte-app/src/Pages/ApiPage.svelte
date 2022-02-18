<script>
  import { getPictureOfTheDay } from "../../api/requests";
</script>

<h1>Api Page</h1>
<p>Here we will best testing the api.</p>
{#await getPictureOfTheDay()}
  <p>Loading...</p>
{:then data}
  <h3>{data.date}</h3>
  <h3>{data.title}</h3>
  <p>{data.explanation}</p>
  <img src={data.hdurl} alt={data.title} />
{/await}

<style>
  h1 {
    text-align: center;
  }
  h3 {
    text-align: center;
  }

  img  {
    height: 680px;
    width: 100%;
    object-fit: cover;
    display: block;
  }
</style>
