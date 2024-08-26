<script lang="ts">
    import { getIconFromCommodity } from "$lib/utils";
    export let data: any;

    const nationId = data.id;
</script>

<div class="wrapper relative bg-cover bg-center">
	<div class="container mx-auto text-left p-4 md:text-center">
		<div class="absolute opacity-60 bg-black z-[1] inset-0" />
		<div class="relative z-[1] space-y-6 pt-32 pb-24 text-white">
			<div class="font-bold text-6xl tracking-tight">
				{data.nation.name}
			</div>
			<p class="max-w-lg md:mx-auto">
				Led by {data.nation.leader.username}
			</p>
		</div>
	</div>
</div>

<div class="px-10 pt-10">
    <!--Population card-->
    <div class="card p-6 space-y-1 flex items-center">
        {data.nation.name} is a {data.nation.system == 0 ? "capitalist" : data.nation.system == 1 ? "socialist" : "dictatorial"} nation with {data.nation.population.toLocaleString("en", { useGrouping: true })} residents.
        Led by {data.nation.leader.username}, the nation has {data.nation.money} Money, and their happiness statistic is {data.nation.happiness}.
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 px-10 pb-5 pt-5">
    <!--Population card-->
    <div class="card p-6 space-y-1">
        <div class="flex justify-between opacity-50 items-center">
            <div class="font-bold text-xs">Population</div>
        </div>
        <div class="flex items-baseline space-x-2">
            <div class="text-2xl font-bold">{data.nation.population.toLocaleString("en", { useGrouping: true })}</div>
        </div>
    </div>

    <!--Happiness card-->
    <div class="card p-6 space-y-1">
        <div class="flex justify-between opacity-50 items-center">
            <div class="font-bold text-xs">Happiness</div>
        </div>
        <div class="flex items-baseline space-x-2">
            <div class="text-2xl font-bold">{data.nation.happiness.toLocaleString("en")}</div>
        </div>
    </div>
</div>

<style>
	.wrapper {
		background-image: url(https://static.wikia.nocookie.net/nationsgame/images/c/c9/WestbergBackground.jpg);
	}
</style>