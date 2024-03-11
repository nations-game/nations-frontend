<script lang="ts">
    import FactoryComponent from "./FactoryComponent.svelte";

    export let data;
    const factories = data.factories;
    const preparedCookie = data.preparedCookie;

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
    {#each categories as [id, fullName]}
        <div class="pb-5">
            <h1 class="px-1 pb-1 text-2xl">{fullName}</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {#each getFactoriesByCategory(id) as factory}
                    <FactoryComponent {factory} {buildButtonDisabed} {preparedCookie} />
                {/each}
            </div>
        </div>
    {/each}
</div>