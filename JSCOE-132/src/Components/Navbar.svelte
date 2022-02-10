<!-- Navbar using svelete Navigator -->
<script>
    import {Link} from "svelte-navigator";

</script>

<header>
    <h1>Navbar</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="api">API Testing</Link>
    </nav>
</header>

<style>
    nav {
        display: flex;
    }

    nav :global(a) {
        color: #fff;
        text-decoration: none;
        padding: 5px;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>