<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Button from '$lib/components/ui/button/button.svelte';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import { Toaster } from 'svelte-sonner';
  import Routes from './routes/routes.svelte';

  const queryClient = new QueryClient();
  let url = "";
</script>

<!-- <div>
  testing
</div> -->
<QueryClientProvider client={queryClient}>
<Toaster/>
<Routes {url}/>
</QueryClientProvider>