<script lang="ts">
    import Icon from "@iconify/svelte";
    import { cn } from "../utils";
    import { Button } from "./ui/button";
    import type { HTMLInputAttributes } from "svelte/elements";
  
    type $$Props = HTMLInputAttributes & {
      class?: string;
      disabled?: boolean;
    };
  
    let showPassword = $state(false);
  
    const setShowPassword = () => {
      showPassword = !showPassword;
    };
  
    let {
      class: className,
      disabled,
      value = $bindable(),
      readonly,
      ...prop
    }: $$Props = $props();
  </script>
  
  <div class="relative">
    <input
      class={cn(
        "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10",
        className
      )}
      bind:value
      {readonly}
      type={showPassword ? "text" : "password"}
      onblur={prop.onblur}
      onchange={prop.onchange}
      onclick={prop.onclick}
      onfocus={prop.onfocus}
      onfocusin={prop.onfocusin}
      onfocusout={prop.onfocusout}
      onkeydown={prop.onkeydown}
      onkeypress={prop.onkeypress}
      onkeyup={prop.onkeyup}
      onmouseover={prop.onmouseover}
      onmouseenter={prop.onmouseenter}
      onmouseleave={prop.onmouseleave}
      onmousemove={prop.onmousemove}
      onpaste={prop.onpaste}
      oninput={prop.oninput}
      onwheel={prop.onwheel || ((e) => e.preventDefault())}
      {...prop}
    />
    <Button
      type="button"
      variant="ghost"
      size="sm"
      class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      onclick={setShowPassword}
      {disabled}
    >
      {#if showPassword}
        <Icon icon="mdi:eye-off" class="h-4 w-4" aria-hidden="true" />
      {:else}
        <Icon icon="mdi:eye" class="h-4 w-4" aria-hidden="true" />
      {/if}
      <span class="sr-only">
        {showPassword ? "Hide password" : "Show password"}
      </span>
    </Button>
  </div>
  