<script lang="ts">
    import { page } from "$app/stores";

    let username: string;
    let password: string;
</script>

<div class="py-10 p-0 mx-auto max-w-md">
    <header class="text-center py-4">
        <div class="text-center mb-2 text-3xl font-bold">Welcome back!</div>
        <p class="unstyled text-sm md:text-base opacity-50">
            Don't have an account yet? <a href="/register">Create account</a>
        </p>
        {#if $page.form?.error}
            <p class="unstyled text-sm md:text-base opacity-50">
                {$page.form.error}
            </p>
        {/if}
    </header>
    <div class="card p-6 space-y-6 shadow-xl text-left">
        <form action="" method="POST" class="space-y-4">
            <label class="label" for="username">
                <span>Username</span>
                <input id="username" name="username" type="text" placeholder="Username" class="input" bind:value={username} />
            </label>
            <label class="label" for="password">
                <span>Password</span>
                <input id="password" name="password" type="password" placeholder="Password" class="input" bind:value={password} />
            </label>
            <!--<label class="inline-flex items-center">
                <input type="checkbox" class="checkbox" />
                <span class="ml-2">Remember me</span>
            </label>-->
            <button type="submit" class="btn variant-filled-primary w-full">Login</button>
        </form>
    </div>
</div>