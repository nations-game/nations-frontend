<script lang="ts">
    import { getIconFromCommodity } from "$lib/utils";
    import { Toast, getToastStore } from "@skeletonlabs/skeleton";
    import type { ToastSettings, ToastStore } from "@skeletonlabs/skeleton";

    export let factory: any;
    export let buildButtonDisabed: boolean;
    export let preparedCookie: string;

    const toastStore = getToastStore();

    const buildFactory = async (factoryID: string) => {
        buildButtonDisabed = true;
        const response = await fetch("/app/factories/build", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ 
                "factoryID": factoryID,
                "preparedCookie": preparedCookie
            })
        });
        if(response.ok) {
            const t: ToastSettings = {
                message: "Built factory!",
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
        {factory.name}
    </header>

    <section class="p-4">
        <div class="grid grid-cols-2 gap-4 items-baseline space-x-2">
            <div>
                <p class="font-bold text-l">Input</p>
                <ul>
                    {#each factory.input as input}
                        <li>
                            <div class="flex items-center">
                                <img src="{getIconFromCommodity(input.commodity)}" alt="{input.commodity}" class="mr-1"> 
                                {input.quantity}
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>

            <div>
                <p class="font-bold text-l">Output</p>
                <ul>
                    {#each factory.output as output}
                        <li>
                            <div class="flex items-center">
                                <img src="{getIconFromCommodity(output.commodity)}" alt="{output.commodity}" class="mr-1"> 
                                {output.quantity}
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        
        <div class="py-4">
            <p class="font-bold text-l">Cost</p>
            <ul>
                {#each factory.cost as cost}
                    <li>
                        <div class="flex items-center">
                            <img src="{getIconFromCommodity(cost.commodity)}" alt="{cost.commodity}" class="mr-1"> 
                            {cost.quantity}
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </section>

    <footer class="card-footer">
        <button disabled={buildButtonDisabed} class="btn btn-md variant-filled" on:click={async () => { await buildFactory(factory.id); }}>Build</button>
    </footer>
</div>    