<script lang="ts">
    import { AppShell, AppBar, Avatar, popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";
    import type { User } from "$lib/types/models";
    import { page } from "$app/stores";

    export let data;
    let user = data.user;

    const dropdownMenu: PopupSettings  = {
        event: "click",
        target: "dropdownMenu",
        placement: "bottom-end"
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "k";
        } else {
            return num.toString();
        }
    }

</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
    <svelte:fragment slot="sidebarLeft">
        <nav class="list-nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </svelte:fragment>

	<svelte:fragment slot="pageHeader">
        <AppBar>
            <svelte:fragment slot="lead">
                <Avatar initials="{user.nation.name.charAt(0)}" width="w-10" rounded="rounded-lg" />
            </svelte:fragment>
            <h3 class="h3">{user.nation.name}</h3>
            <svelte:fragment slot="trail">
                <button class="btn variant-filled" use:popup={dropdownMenu}>
                    {user.username}
                </button>
                <div class="card p-4" data-popup="dropdownMenu">
                    <nav class="list-nav">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </nav>
	                <div class="arrow" />
                </div>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

	<slot />

	<svelte:fragment slot="footer">
        <div class="p-4 space-x-4 flex">
            <div class="flex items-center">
                <img src="/icons/money_icon.png" alt="Money" class="mr-1">{formatNumber(user.nation.money)}
            </div>
            <div class="flex items-center">
                <img src="/icons/food_icon.png" alt="Food" class="mr-1">{formatNumber(user.nation.food)}
            </div>
            <div class="flex items-center">
                <img src="/icons/power_icon.png" alt="Power" class="mr-1">{formatNumber(user.nation.power)}
            </div>
            <div class="flex items-center">
                <img src="/icons/bm_icon.png" alt="Building Materials" class="mr-1">{formatNumber(user.nation.buildingMaterials)}
            </div>
            <div class="flex items-center">
                <img src="/icons/metal_icon.png" alt="Metal" class="mr-1">{formatNumber(user.nation.metal)}
            </div>
            <div class="flex items-center">
                <img src="/icons/cg_icon.png" alt="Consumer Goods" class="mr-1">{formatNumber(user.nation.consumerGoods)}
            </div>
        </div>
    </svelte:fragment>
</AppShell>