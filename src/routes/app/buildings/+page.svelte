<script lang="ts">
    import BuildingComponent from "./BuildingComponent.svelte";

    export let data;
    const buildings = data.buildings;
    const nationBuildings = data.nationBuildings;
    const preparedCookie = data.preparedCookie;

    const alreadyHasBuilding = (buildingId: string) => {
        for(let building of nationBuildings) {
            if(building.id === buildingId) return true;
        }
        return false;
    }

    let buildButtonDisabed = false;
</script>

<div class="p-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each buildings as building}
            {#if !alreadyHasBuilding(building.id)}
                <BuildingComponent {building} {buildButtonDisabed} {preparedCookie} />
            {/if}
        {/each}
    </div>
</div>