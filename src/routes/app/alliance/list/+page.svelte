<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";
    import { DataHandler } from "@vincjo/datatables";

    export let data;
    const alliances = data.alliances;
    const handler = new DataHandler(alliances, { rowsPerPage: 5 });
    const rows = handler.getRows(); 
</script>

{JSON.stringify(alliances)}


<div class="p-10">
    <div class="table-container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Member Count</th>
                    <th>Owner</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each $rows as alliance}
                    <tr>
                        <td>{alliance.name}</td>
                        <td>{alliance.member_count}</td>
                        <td>
                            <div class="flex items-center space-x-2">
                                <Avatar initials="{alliance.nation.name.charAt(0)}" width="w-10" rounded="rounded-lg" />
                                <span>{alliance.nation.name}</span>
                            </div>
                        </td>
                        <td><button disabled={alliance.status === "private"} class="btn btn-md variant-filled" on:click={async () => { alert(JSON.stringify(alliance)) }}>Join</button></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>