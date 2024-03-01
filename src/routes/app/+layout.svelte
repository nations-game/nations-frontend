<script lang="ts">
    import { AppShell, AppBar, Avatar, popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";

    let nation = {
        name: "Testonia"
    };

    let user = {
        username: "TestUser"
    };

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
                <Avatar initials="{nation.name.charAt(0)}" width="w-10" rounded="rounded-lg" />
            </svelte:fragment>
            <h3 class="h3">{nation.name}</h3>
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
        <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
            <svelte:fragment slot="lead">
                <strong>M</strong> 50.0k
                <strong>F</strong> 50.0k
                <strong>P</strong> 50.0k
                <strong>BM</strong> 50.0k
                <strong>M</strong> 50.0k
                <strong>CG</strong> 50.0k
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
</AppShell>