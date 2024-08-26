<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";
    import { DataHandler } from "@vincjo/datatables";
    import { Toast, getToastStore } from "@skeletonlabs/skeleton";
    import type { ToastSettings, ToastStore } from "@skeletonlabs/skeleton";

    export let data;
    const alliances = data.alliances;
    const preparedCookie = data.preparedCookie;
    const handler = new DataHandler(alliances, { rowsPerPage: 5 });
    const rows = handler.getRows(); 
    const toastStore = getToastStore();

    const joinAlliance = async (allianceID: string) => {
        const response = await fetch("/app/alliance/list/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": preparedCookie
            },
            body: JSON.stringify({ 
                "allianceID": allianceID,
                "preparedCookie": preparedCookie
            })
        });
        if(response.ok) {
            const t: ToastSettings = {
                message: "Joined alliance!",
                timeout: 2000
            };
            toastStore.trigger(t);
        } else {
            const json = await response.json();
            const t: ToastSettings = {
                message: `${json.message}`,
                timeout: 2000,
                background: "variant-filled-error"
            };
            toastStore.trigger(t);
        }
    }
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
                        <td><a class="btn btn-md variant-filled" href="/app/alliance/{alliance.id}">View</a></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>