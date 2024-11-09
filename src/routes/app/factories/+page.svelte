<script lang="ts">
    import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton";
    import FactoryComponent from "./FactoryComponent.svelte";

    export let data;
    const factories = data.factories;
    const preparedCookie = data.preparedCookie;
    let tabSet: string = "food";

    const categories = [
        ["food", "Food"],
        ["power", "Power"],
        ["cg", "Consumer Goods"],
        ["bm", "Building Materials"]
    ];

    let buildButtonDisabed = false;

    const getFactoriesByCategory = (category: string) => {
        let categoryFactories: any[] = [];
        for(let factory of factories) {
            if(factory.category === category) {
                categoryFactories.push(factory);
            }
        }
        return categoryFactories;
    }
</script>

<div class="p-10">
    <TabGroup>
        {#each categories as [id, fullName]}
            <Tab bind:group={tabSet} name={fullName} value={id}>{fullName}</Tab>
        {/each}
        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {#each getFactoriesByCategory(tabSet) as factory}
                    <FactoryComponent {factory} {buildButtonDisabed} {preparedCookie} />
                {/each}
            </div>
        </svelte:fragment>
    </TabGroup>
</div>