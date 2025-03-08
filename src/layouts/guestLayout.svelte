<script lang="ts">
    import Navbar from "../lib/components/navbar.svelte";
  
    let { children } = $props();
  </script>
  
  <div class="relative">
    <Navbar />
    <main>
      <div class="py-4 px-8 mt-14">
        {@render children?.()}
      </div>
    </main>
  </div>
  