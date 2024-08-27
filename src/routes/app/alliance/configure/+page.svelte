<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";
    import { DataHandler } from "@vincjo/datatables";
    import { Toast, getToastStore } from "@skeletonlabs/skeleton";
    import type { ToastSettings, ToastStore } from "@skeletonlabs/skeleton";
    import { popup } from "@skeletonlabs/skeleton";
    import type { PopupSettings } from "@skeletonlabs/skeleton";

    export let data: any;
    const alliance = data.alliance;
    const nationRole = data.nationRole;
    const members = alliance.members;
    const joinRequests = data.joinRequests.details;
    const preparedCookie = data.preparedCookie;

    const joinRequestsHandler = new DataHandler(joinRequests, { rowsPerPage: 5 });
    const joinRequestsRows = joinRequestsHandler.getRows(); 

    const membersHandler = new DataHandler(members, { rowsPerPage: 5 });
    const membersRows = membersHandler.getRows(); 
</script>

<div class="p-10">
    <div class="py-5">
        <h1 class="px-1 py-2 text-2xl">Configure Alliance</h1>
        <form method="POST" action="?/shout">
            <div class="card p-5">
                <input class="input m-2" type="text" name="shout" placeholder={alliance.shout.text} />
                <button formaction="?/shout" class="btn variant-filled m-2">Shout</button>
            </div>
        </form>
    </div>

    <div class="py-5">
        <h1 class="px-1 py-2 text-2xl">Join Requests</h1>
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $joinRequestsRows as joinRequest}
                        <tr>
                            <td>
                                <div class="flex items-center space-x-2">
                                    <Avatar initials="{joinRequest.nation.name.charAt(0)}" width="w-10" rounded="rounded-lg" />
                                    <span>{joinRequest.nation.name}</span>
                                </div>
                            </td>
                            <td>
                                <form method="POST" action="?/acceptJoinRequest">
                                    <input type="hidden" name="id" value="{joinRequest.id}" />
                                    <input type="hidden" name="preparedCookie" value="{preparedCookie}" />
                                    <button formaction="?/acceptJoinRequest" class="btn btn-md variant-filled">Accept Request</button>
                                </form>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <div class="py-5">
            <h1 class="px-1 text-2xl">Members</h1>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Leader</th>
                            <th>Population</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $membersRows as nation}
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
                                <td>
                                    <button class="btn variant-filled right" use:popup={{ event: "click", target: "popupFeatured-" + nation.nationID, placement: "bottom" }}>Options</button>
                                    <div class="card p-4 shadow-xl" data-popup="popupFeatured-{nation.nationID}">
                                        <div class="btn-group-vertical">
                                            <form method="POST" action="?/kickMember">
                                                <input type="hidden" name="preparedCookie" value="{preparedCookie}" />
                                                <input type="hidden" name="nationID" value="{nation.nationID}" />
                                                <button formaction="?/kickMember">Kick Member {nation.nationID}</button>
                                            </form>
                            
                                            {#if nationRole === "owner"}
                                                {#if nation.alliance_role === "member"}
                                                    <form method="POST" action="?/promoteToAdmin">
                                                        <input type="hidden" name="preparedCookie" value="{preparedCookie}" />
                                                        <input type="hidden" name="nationID" value="{nation.nationID}" />
                                                        <button formaction="?/promoteToAdmin">Promote to Admin</button>
                                                    </form>
                                                {:else if nation.alliance_role === "admin"}
                                                    <form method="POST" action="?/demoteToMember">
                                                        <input type="hidden" name="preparedCookie" value="{preparedCookie}" />
                                                        <input type="hidden" name="nationID" value="{nation.nationID}" />
                                                        <button formaction="?/demoteToMember">Demote to Member</button>
                                                    </form>
                                                {/if}
                                                <form method="POST" action="?/transferOwnership">
                                                    <input type="hidden" name="preparedCookie" value="{preparedCookie}" />
                                                    <input type="hidden" name="nationID" value="{nation.nationID}" />
                                                    <button formaction="?/transferOwnership">Transfer Ownership</button>
                                                </form>
                                            {/if}
                                        </div>
                                        <div class="arrow bg-surface-100-800-token" />
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>


        {#if nationRole === "owner"}
            <div class="py-5">
                <h1 class="px-1 py-2 text-2xl">Delete Alliance</h1>
                <div class="card p-5">
                    <form method="POST" action="?/deleteAlliance">
                        <input type="hidden" name="preparedCookie" value="{preparedCookie}" />
                        <button formaction="?/deleteAlliance" class="btn btn-md variant-filled">Delete Alliance</button>
                    </form>
                </div>
            </div>
        {/if}
    </div>
</div>