<script lang="ts">
    import UpgradeComponenet from "./UpgradeComponenet.svelte";

    export let data: any;
    const upgrades = data.upgrades;
    const preparedCookie = data.preparedCookie;

    let upgradeButtonDisabled = false;
</script>

<div class="p-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each upgrades as upgrade}
            <UpgradeComponenet {upgrade} {upgradeButtonDisabled} {preparedCookie} />
        {/each}
    </div>
</div>