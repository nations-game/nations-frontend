<script lang="ts">
    import { getIconFromCommodity } from "$lib/utils";
    import { Toast, getToastStore } from "@skeletonlabs/skeleton";
    import type { ToastSettings, ToastStore } from "@skeletonlabs/skeleton";

    export let upgrade: any;
    export let upgradeButtonDisabled: boolean;
    export let preparedCookie: string;

    const toastStore = getToastStore();

    const doUpgrade = async (upgradeID: string) => {
        upgradeButtonDisabled = true;
        const response = await fetch("/app/upgrades/upgrade", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ 
                "upgradeID": upgradeID,
                "preparedCookie": preparedCookie
            })
        });
        if(response.ok) {
            const t: ToastSettings = {
                message: "Upgraded!",
                timeout: 2000
            };
            toastStore.trigger(t);
        } else {
            const json = await response.json();
            const t: ToastSettings = {
                message: `${JSON.stringify(json)}`,
                timeout: 2000,
                background: "variant-filled-error"
            };
            toastStore.trigger(t);
        }
        upgradeButtonDisabled = false;
    }
</script>

<div class="card">
    <header class="card-header font-bold">
        <p class="text-xl">{upgrade.name}</p>
        {#if upgrade.level > 0}
            <p class="text-slate-400">Level {upgrade.level}</p>
        {:else}
            <p class="text-slate-400">Not Owned</p>
        {/if}
    </header>

    <section class="p-4">
        <p>{upgrade.description}</p>
        <div class="py-4">
            <p class="font-bold text-l">Cost</p>
            <ul>
                {#if upgrade.cost !== "free"}
                    {#each upgrade.cost as cost}
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
        <button disabled={upgradeButtonDisabled} class="btn btn-md variant-filled" on:click={async () => { await doUpgrade(upgrade.id) }}>
            {#if upgrade.level > 0}
                Upgrade to level {upgrade.level + 1}
            {:else}
                Purchase
            {/if}
        </button>
    </footer>
</div>    