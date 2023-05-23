<script>
	import CarTimelineByDay from "./CarTimelineByDay.svelte";
    import {carData} from "$lib/store/car_data";

    /**
	 * @type {string | number}
	 */
    export let carId;
    /**
	 * @type {number}
	 */
     export let selectedMinute;

    /**
	 * @type {number}
	 */
    let minDay;
    /**
	 * @type {number}
	 */
    let maxDay;

    /**
	 * @type {any[]}
	 */
    let days = [];

    /**
	 * @param {number} _selectedMinute
	 */
    function calc(_selectedMinute) {
        const _days = [];
        // @ts-ignore
        const timeRange = $carData.timeRanges[carId];
        const minDay = timeRange.minDay;
        const maxDay = timeRange.maxDay;
        for (let i=minDay; i<=maxDay; i++) {
            _days.push({
                day: i, 
                // @ts-ignore
                carId,
                selectedMinute: _selectedMinute
            });
        }
        return _days;
    }

    $: days = calc(selectedMinute)
</script>

<div class="car-timeline">
    {#each days as day (day.day)}
        <CarTimelineByDay {...day}/>
    {/each}
</div>
    

<style>
    .car-timeline {
        display: inline-block;
        vertical-align: middle;
    }
</style>