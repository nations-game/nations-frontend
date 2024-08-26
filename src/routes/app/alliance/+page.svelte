<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";
    import { DataHandler } from "@vincjo/datatables";
    import { popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";
    import { Toast, getToastStore } from "@skeletonlabs/skeleton";
    import type { ToastSettings, ToastStore } from "@skeletonlabs/skeleton";
    const toastStore = getToastStore();

    export let data;
    const preparedCookie = data.preparedCookie;
    const alliance = data.alliance;
    const nationRole = data.nationRole;

    const members = alliance.members;
    const handler = new DataHandler(members, { rowsPerPage: 5 });
    const rows = handler.getRows(); 

    const getNationByID = (nationID: string) => {
        for(let i = 0; i < members.length; i++) {
            if(members[i].nationID == nationID) {
                return members[i];
            }
        }
    }

    const popupFeatured: PopupSettings = {
        event: "click",
        target: "popupFeatured",
        placement: "bottom",
    };

    const leaveAlliance = async () => {
        const response = await fetch("/app/alliance/leave", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": preparedCookie
            },
            body: JSON.stringify({
                "preparedCookie": preparedCookie
            })
        });
        if(response.ok) {
            const content = await response.text();
            const t: ToastSettings = {
                message: content,
                timeout: 2000
            };
            toastStore.trigger(t);
        } else {
            const json = await response.json();
            const t: ToastSettings = {
                message: json,
                timeout: 2000,
                background: "variant-filled-error"
            };
            toastStore.trigger(t);
        }
    }
</script>

{#if alliance !== ""}
    <div class="wrapper relative bg-cover bg-center">
        <div class="container mx-auto text-left p-4 md:text-center">
            <div class="absolute opacity-60 bg-black z-[1] inset-0" />
            <div class="relative z-[1] space-y-6 pt-32 pb-24 text-white">
                <div class="font-bold text-6xl tracking-tight">
                    {alliance.name}
                </div>
            </div>
        </div>
    </div>

    <div class="p-10">
        <div class="grid grid-cols-4">
            <div class="col-start-5 cold-end-6">
                <button class="btn variant-filled right" use:popup={popupFeatured}>Options</button>
            </div>
        </div>
        <div class="card p-4 shadow-xl" data-popup="popupFeatured">
            <div class="btn-group-vertical">
                <button on:click={async () => { leaveAlliance(); }}>Leave Alliance</button>

                {#if nationRole === "owner" || nationRole === "admin"}
                    <a href="/app/alliance/configure">Configure Alliance</a>
                {/if}
            </div>
            <div class="arrow bg-surface-100-800-token" />
        </div>

        {#if alliance.shout !== "empty"}
            <div class="card p-3 my-5">
                <div class="grid grid-cols-[auto_1fr] gap-2">
                    <Avatar initials="{getNationByID(alliance.shout.nation).name.charAt(0)}" width="w-12" />
                    <div class="card p-4 variant-soft rounded-tl-none space-y-2">
                        <header class="flex justify-between items-center">
                            <p class="font-bold">{getNationByID(alliance.shout.nation).name}</p>
                        </header>
                        <p>{alliance.shout.text}</p>
                    </div>
                </div>
            </div>
        {:else}
            <div class="card p-3 m-5">
                <div class="grid grid-cols-[auto_1fr] gap-2">
                    <Avatar initials="S" width="w-12" />
                    <div class="card p-4 variant-soft rounded-tl-none space-y-2">
                        <header class="flex justify-between items-center">
                            <p class="font-bold">System</p>
                        </header>
                        <p>Welcome to {alliance.name}!</p>
                    </div>
                </div>
            </div>
            {/if}
    
        <h1 class="px-1 text-2xl">Members</h1>
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Leader</th>
                        <th>Population</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $rows as nation}
                        <tr>
                            <td>
                                <div class="flex items-center space-x-2">
                                    <Avatar initials="{nation.name.charAt(0)}" width="w-10" rounded="rounded-lg" />
                                    <a href="/app/nation/{nation.nationID}">{nation.name}</a>
                                </div>
                            </td>
                            <td>{nation.leaderID}</td>
                            <td>{nation.population}</td>
                            <td>{nation.alliance_role[0].toUpperCase() + nation.alliance_role.slice(1)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{:else}
    <div class="p-10">
        <h1 class="text-2xl">Looks like you aren't a member of an alliance.</h1>
        <p>That's okay! You can <a class="anchor" href="/app/alliance/list">browse alliances to join</a> or you can <a class="anchor" href="/app/alliance/create">create your own.</a></p>
    </div>
{/if}