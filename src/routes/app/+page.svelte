<script lang="ts">
    import { getToastStore } from "@skeletonlabs/skeleton";
    import type { ToastSettings } from "@skeletonlabs/skeleton";
    import { getIconFromCommodity } from "$lib/utils";
    import { onMount } from "svelte";

    const toastStore = getToastStore();
    export let data;

    let taxesButtonDisabled = false;
    let collectButtonsDisabled = false;

    onMount(() => {
        const interval = setInterval(async () => {
            const resp = await fetch("/app/fullnationinfo", {
                headers: {
                    "Cookie": data.preparedCookie
                }
            });
            const json = await resp.json();
            // console.log(json);
            data.user = json.user;
        }, 5000);

        return () => clearInterval(interval);
    });

    const collectTaxes = async () => {
        taxesButtonDisabled = true;
        const response = await fetch("/app/nation/collecttaxes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": data.preparedCookie
            },
            body: JSON.stringify({
                "preparedCookie": data.preparedCookie
            })
        });
        if(response.ok) {
            toastStore.trigger({
                message: "Collected taxes!",
                timeout: 2000
            });
            data.user.nation.pendingTaxes = 0;
        } else {
            toastStore.trigger({
                message: "Error collecting taxes.",
                timeout: 2000,
                background: "variant-filled-error"
            });
        }
        taxesButtonDisabled = false;
    }

    const collectFromFactory = async (factoryID: string) => {
        collectButtonsDisabled = true;
        const response = await fetch("/app/factories/collect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": data.preparedCookie
            },
            body: JSON.stringify({ 
                "factoryID": factoryID,
                "preparedCookie": data.preparedCookie
            })
        });
        if(response.ok) {
            toastStore.trigger({
                message: "Collected from factory!",
                timeout: 2000
            });
        } else {
            const json = await response.json();
            toastStore.trigger({
                message: `Error collecting from factory: ${json.details}`,
                timeout: 2000,
                background: "variant-filled-error"
            });
        }
        collectButtonsDisabled = false;
    }
</script>

<div class="wrapper relative bg-cover bg-center">
	<div class="container mx-auto text-left p-4 md:text-center">
		<div class="absolute opacity-60 bg-black z-[1] inset-0" />
		<div class="relative z-[1] space-y-6 pt-32 pb-24 text-white">
			<div class="font-bold text-6xl tracking-tight">
				{data.user.nation.name}
			</div>
			<p class="max-w-lg md:mx-auto">
				Welcome to your homepage!
			</p>
		</div>
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 pb-5 pt-10">
    <!--Population card-->
    <div class="card p-6 space-y-1">
        <div class="flex justify-between opacity-50 items-center">
            <div class="font-bold text-xs">Population</div>
        </div>
        <div class="flex items-baseline space-x-2">
            <div class="text-2xl font-bold">{data.user.nation.population.toLocaleString("en", { useGrouping: true })}</div>
        </div>
    </div>

    <!--Happiness card-->
    <div class="card p-6 space-y-1">
        <div class="flex justify-between opacity-50 items-center">
            <div class="font-bold text-xs">Happiness</div>
        </div>
        <div class="flex items-baseline space-x-2">
            <div class="text-2xl font-bold">{data.user.nation.happiness.toLocaleString("en")}</div>
        </div>
    </div>

    <!--Taxes card-->
    <div class="card p-6 space-y-1">
        <div class="flex justify-between opacity-50 items-center">
            <div class="font-bold text-xs">Pending taxes</div>
        </div>
        <div class="grid grid-cols-2 gap-4 items-baseline space-x-2">
            <div class="text-2xl font-bold place-self-start">${data.user.nation.pendingTaxes.toLocaleString("en", { useGrouping: true })}</div>
            <button class="btn btn-sm variant-filled" disabled={taxesButtonDisabled} on:click={async () => { await collectTaxes(); }}>Collect</button>
        </div>
    </div>
</div>

{#if data.user.nation.factories.length > 0}
    <h1 class="px-11 text-2xl">
        My Factories
        <button disabled={collectButtonsDisabled} class="btn btn-sm variant-filled" on:click={async () => {
            for(let factory of data.user.nation.factories) {
                await collectFromFactory(factory.info.id);
                factory.ticks_run = 0;
            }
        }}>Collect All</button>
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 py-2">
        {#each data.user.nation.factories as factory}
            <div class="card">
                <header class="card-header text-2xl font-bold">
                    {factory.info.name}
                </header>

                <section class="p-4">
                    <p class="text-l"><strong>Quantity:</strong> {factory.quantity}</p>
                    <p class="font-bold text-l">To Collect</p>
                    <ul>
                        {#each factory.info.output as output}
                            <li>
                                <div class="flex items-center">
                                    <img src="{getIconFromCommodity(output.commodity)}" alt="{output.commodity}" class="mr-1"> 
                                    {output.quantity * factory.ticks_run}
                                </div>
                            </li>
                        {/each}
                    </ul>
                </section>

                <footer class="card-footer">
                    <button disabled={collectButtonsDisabled} class="btn btn-md variant-filled" on:click={async () => { 
                        await collectFromFactory(factory.info.id);
                        factory.ticks_run = 0;
                    }}>Collect</button>
                </footer>
            </div>
        {/each}
    </div>
{/if}

<style>
	.wrapper {
		background-image: url(https://static.wikia.nocookie.net/nationsgame/images/c/c9/WestbergBackground.jpg);
	}
</style>