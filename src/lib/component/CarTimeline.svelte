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

    const timelineWidth = 400;

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
                selectedMinute: _selectedMinute,
                width: timelineWidth
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
    <div class="time-label" style="width: {timelineWidth - 30}px;">
        <span>0</span>
        <span>6</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
    </div>
</div>
    

<style>
    .time-label {
        display: block;
        white-space: nowrap;
        margin-left: 30px;
    }

    .time-label span {
        display: inline-block;
        text-align: left;
        margin-left: 25%;
        width: 0px;
    }

    .time-label span:nth-child(1) {
        margin-left: 0;
    }

    .car-timeline {
        display: inline-block;
        vertical-align: middle;
    }
</style>