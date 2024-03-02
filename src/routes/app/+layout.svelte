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
        <AppBar>
            <svelte:fragment>
                <strong>M</strong> {user.nation.money}
                <strong>F</strong> {user.nation.food}
                <strong>P</strong> {user.nation.power}
                <strong>BM</strong> {user.nation.buildingMaterials}
                <strong>M</strong> {user.nation.metal}
                <strong>CG</strong> {user.nation.consumerGoods}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
</AppShell>