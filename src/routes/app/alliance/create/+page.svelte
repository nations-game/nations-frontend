<script lang="ts">
    export let data;
</script>

{#if data.user.nation.allianceID === ""}
    <div class="p-10 mx-auto max-w-md">
        <div class="card p-6 space-y-6 shadow-xl text-left">
            <form method="POST">
                <label class="label">
                    <span>Alliance Name</span>
                    <input id="name" name="name" class="input" type="text" placeholder="Input" />
                </label>
    
                <label class="flex items-center space-x-2">
                    <input id="public" name="public" class="checkbox" type="checkbox" checked />
                    <p>Make alliance public</p>
                </label>
    
                <label class="label">
                    <span>Alliance Icon</span>
                    <input id="icon" name="icon" class="input" type="file" />
                </label>
    
    
                <button type="submit" class="btn variant-filled-primary w-full">Create Alliance</button>
            </form>
        </div>
    </div>
{:else}
    <div class="p-10 mx-auto max-w-md">
        <div class="card p-6 space-y-6 shadow-xl text-left">
            You're already in an alliance!
        </div>
    </div>
{/if}