<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";
    import { DataHandler } from "@vincjo/datatables";

    export let data;
    const alliance = data.alliance;


    const members = alliance.members;
    const handler = new DataHandler(members, { rowsPerPage: 5 });
    const rows = handler.getRows(); 
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
                                    <span>{nation.name}</span>
                                </div>
                            </td>
                            <td>{nation.leader_id}</td>
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