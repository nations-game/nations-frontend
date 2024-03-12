<script lang="ts">
    import { getIconFromCommodity } from "$lib/utils";
    import { Toast, getToastStore } from "@skeletonlabs/skeleton";
    import type { ToastSettings, ToastStore } from "@skeletonlabs/skeleton";

    export let building: any;
    export let buildButtonDisabed: boolean;
    export let preparedCookie: string;

    const toastStore = getToastStore();

    const buildBuilding = async (buildingID: string) => {
        buildButtonDisabed = true;
        const response = await fetch("/app/buildings/build", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ 
                "buildingID": buildingID,
                "preparedCookie": preparedCookie
            })
        });
        if(response.ok) {
            const t: ToastSettings = {
                message: "Built building!",
                timeout: 2000
            };
            toastStore.trigger(t);
        } else {
            const json = await response.json();
            const t: ToastSettings = {
                message: `${json.message}`,
                timeout: 2000,
                background: "variant-filled-error"
            };
            toastStore.trigger(t);
        }
        buildButtonDisabed = false;
    }
</script>

<div class="card">
    <header class="card-header text-xl font-bold">
        {building.name}
    </header>

    <section class="p-4">
        <p>{building.description}</p>
        <div class="py-4">
            <p class="font-bold text-l">Cost</p>
            <ul>
                {#if building.cost !== "free"}
                    {#each building.cost as cost}
                        <li>
                            <div class="flex items-center">
                                <img src="{getIconFromCommodity(cost.commodity)}" alt="{cost.commodity}" class="mr-1"> 
                                {cost.quantity}
                            </div>
                        </li>
                    {/each}
                {:else}
                        Free!
                {/if}
            </ul>
        </div>
    </section>

    <footer class="card-footer">
        <button disabled={buildButtonDisabed} class="btn btn-md variant-filled" on:click={async () => { await buildBuilding(building.id); }}>Build</button>
    </footer>
</div>    