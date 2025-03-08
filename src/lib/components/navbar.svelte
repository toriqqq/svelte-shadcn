<script>
    import { navigate } from "svelte-routing";
    import { Button } from "./ui/button";
    // import ToggleMode from "./toggle-mode.svelte";
    import { useLogoutMutation, verifyUser } from "../../services/auth";
  
    const query = verifyUser();
  
    const mutate = useLogoutMutation();
  
    const logoutHandler = () => {
      $mutate.mutate();
    };
  </script>
  
  <div
    class="flex justify-between items-center py-4 px-8 fixed top-0 right-0 left-0 z-50 bg-gray-500"
  >
    <h1 class="text-lg font-medium">
      Finance App
    </h1>
  
    <div class="flex items-center gap-4">
      <!-- <ToggleMode /> -->
      {#await $query.isFetching}
        <div>Loading....</div>
      {:then}
      {#if $query.data?.info}
        <Button
          variant="secondary"
          size="sm"
          onclick={logoutHandler}
          disabled={$mutate.isLoading}
        >
          {#if $mutate.isLoading}
            Loading ,,,
          {:else}
            Logout
          {/if}
        </Button>
      {:else}
        <Button
          onclick={() => {
            navigate("/auth/login");
          }}
          size="sm">Login</Button
        >
      {/if}
      {:catch}
        <Button
          onclick={() => {
            navigate("/auth/login");
          }}
          size="sm">Login</Button
        >
      {/await}
    </div>
  </div>
  