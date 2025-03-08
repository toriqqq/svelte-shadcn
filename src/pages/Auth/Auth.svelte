<script lang="ts">
    import { useAuthMutation } from "../../services/auth";
    import * as yup from "yup";
    import { createForm } from "svelte-forms-lib";
  import PasswordInput from "$lib/components/password-input.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
    // import { z } from "zod";

    const mutate = useAuthMutation();
    const schema = yup.object({
        username: yup.string().min(1, "Username is required"),
        password: yup.string().min(1, "Password is required"),
    });

  //   const { mutate: login, isLoading } = $mutate;

  const { form, handleChange, handleSubmit, errors, validateField } =
    createForm({
      validationSchema: schema,
      validate: (values) => {
        const errors: { username?: string; password?: string } = {};
        if (!values.username) {
          errors.username = "Username is required";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      },
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit: (values) => {
        $mutate.mutate({
          username: values.username,
          password: values.password,
        });
      },
    });
</script>
<div>
    <div class="flex justify-center items-center h-screen">
      <div class="w-96 flex flex-col gap-8">
        <h1 class="text-4xl font-bold">Login</h1>
        <form class="flex flex-col gap-6" onsubmit={handleSubmit}>
          <div class="flex flex-col gap-1">
            <label for="email">Username</label>
            <Input
              type="username"
              id="username"
              name="username"
              placeholder="Username"
              bind:value={$form.username}
              onchange={handleChange}
              onkeyup={() => validateField("username")}
            />
            {#if $errors.username}
              <span class="text-red-500 text-xs">{$errors.username}</span>
            {/if}
          </div>
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Password"
              bind:value={$form.password}
              onchange={handleChange}
              onkeyup={() => validateField("password")}
            />
            {#if $errors.password}
              <span class="text-red-500 text-xs">{$errors.password}</span>
            {/if}
          </div>
          <Button type="submit" disabled={$mutate.isLoading}>
            {#if $mutate.isLoading}
              Loading ,,,
            {:else}
              Login
            {/if}
          </Button>
        </form>
      </div>
    </div>
  </div>