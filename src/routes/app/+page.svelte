<script lang="ts">
    import { enhance } from "$app/forms";

    export let data;
</script>

<div class="wrapper relative bg-cover bg-center">
	<div class="container mx-auto text-left p-4 md:text-center">
		<div class="absolute opacity-60 bg-black z-[1] inset-0" />
		<div class="relative z-[1] space-y-6 pt-32 pb-24 text-white">
			<div class="font-bold text-6xl tracking-tight">
				{data.user.nation.name}
			</div>
			<p class="max-w-lg md:mx-auto">
				Welcome to your homepage!
			</p>
		</div>
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
    <!--Population card-->
    <div class="card p-6 space-y-1">
        <div class="flex justify-between opacity-50 items-center">
            <div class="font-bold text-xs">Population</div>
        </div>
        <div class="flex items-baseline space-x-2">
            <div class="text-2xl font-bold">{data.user.nation.population.toLocaleString("en", { useGrouping: true })}</div>
        </div>
    </div>

    <!--Taxes card-->
    <div class="card p-6 space-y-1">
        <div class="flex justify-between opacity-50 items-center">
            <div class="font-bold text-xs">Pending taxes</div>
        </div>
        <div class="grid grid-cols-2 gap-4 items-baseline space-x-2">
            <div class="text-2xl font-bold place-self-start">${data.user.nation.pendingTaxes.toLocaleString("en", { useGrouping: true })}</div>
            <form method="POST" action="?/collectTaxes" class="place-self-end">
                <button type="submit" class="btn btn-sm variant-filled">Collect</button>
            </form>
        </div>
    </div>
</div>

<style>
	.wrapper {
		background-image: url(https://static.wikia.nocookie.net/nationsgame/images/c/c9/WestbergBackground.jpg);
	}
</style>