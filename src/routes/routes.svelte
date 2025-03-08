<script>
  import Auth from "../pages/Auth/Auth.svelte";
  import Home from "../pages/Home/Home.svelte";
  import { Router, Route } from "svelte-routing";

  export let url = "";
</script>

<Router {url}>
    <Route path="/">
        <Home/>
    </Route>
    <Route path="/auth/login">
        <Auth />
      </Route>
</Router>