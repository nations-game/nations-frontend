<script lang="ts">
    import { getIconFromCommodity } from "$lib/utils.js";

    export let data;
    const factories = data.factories;
    const preparedCookie = data.preparedCookie;

    const buildFactory = async (factoryID: string) => {
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

        const text = await response.text();
        console.log(text)

        const json = await response.json();
        console.log(json)
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
    {#each factories as factory}
        <div class="card">
            <header class="card-header text-2xl font-bold">
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
                <!--TODO: Implement logic for this so it doesn't reload the page-->
                <button class="btn btn-md variant-filled" on:click={async () => { await buildFactory(factory.id); }}>Build</button>
            </footer>
        </div>         
    {/each}
</div>