<script lang="ts">
    export let data;
    const alliance = data.alliance;
</script>

{#if alliance !== ""}
    <div class="wrapper relative bg-cover bg-center">
        <div class="container mx-auto text-left p-4 md:text-center">
            <div class="absolute opacity-60 bg-black z-[1] inset-0" />
            <div class="relative z-[1] space-y-6 pt-32 pb-24 text-white">
                <div class="font-bold text-6xl tracking-tight">
                    {alliance.name}
                </div>
            </div>
        </div>
    </div>


    {JSON.stringify(alliance)}
{:else}
    <div class="p-10">
        <h1 class="text-2xl">Looks like you aren't a member of an alliance.</h1>
        <p>That's okay! You can <a class="anchor" href="/app/alliance/list">browse alliances to join</a> or you can <a class="anchor" href="/app/alliance/create">create your own.</a></p>
    </div>
{/if}