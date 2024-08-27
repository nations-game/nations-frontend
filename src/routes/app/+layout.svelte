<script lang="ts">
    import { AppShell, AppBar, Avatar, popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";
    import type { User } from "$lib/types/models";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    export let data;
    $: user = data.user;


    onMount(async () => {
        const resp = await fetch("/app/fullnationinfo", {
            headers: {
                "Cookie": data.preparedCookie
            }
        });
        const json = await resp.json();
        user = json.user;
    });

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
                <!--Basic stuff-->
                Your Stuff
                <hr class="!border-t-1" />
                <li><a href="/app">Overview</a></li>

                <!--Build stuff-->
                Shop
                <hr class="!border-t-1" />
                <li><a href="/app/factories">Factories</a></li>
                <li><a href="/app/buildings">Buildings</a></li>

                <!--Diplomacy-->
                Diplomacy
                <hr class="!border-t-1" />
                <li><a href="/app/alliance">My Alliance</a></li>
                <li><a href="/app/alliance/list">All Alliances</a></li>
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
                <!--Not sure what we're going to do with this yet. Probably user settings or mail.-->
                <button class="btn variant-filled" use:popup={dropdownMenu}>
                    {user.username}
                </button>
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
            <div class="flex items-center">
                <img src="/icons/land_icon.png" alt="Land" class="mr-1">{formatNumber(user.nation.land)} km²
            </div>
        </div>
    </svelte:fragment>
</AppShell>