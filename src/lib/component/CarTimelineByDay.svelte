<script>
    import {carData} from "$lib/store/car_data"

    /**
	 * @type {number}
	 */
    export let day;
    export let carId;
    export let selectedMinute = 0;

    /**
	 * @type {any[]}
	 */
    let points = [];

    const anchorStep = 6*60;
    const anchors = [anchorStep, anchorStep * 2, anchorStep * 3]

    /**
	 * @param {number} _selectedMinute
	 */
    function calcPoints(_selectedMinute) {
        const _points = [];
        // @ts-ignore
        const timeRange = $carData.timeRanges[carId];
        const dayMinuteOffsetStart = (day - timeRange.minDay) * 24 * 60;
        for (let i = 0; i < 1440; i++) {
            const offset = dayMinuteOffsetStart + i;
            const isWhite = i % anchorStep == 0;
            const isBlack = offset == _selectedMinute;
            _points.push({
                key: offset,
                color: isBlack ? "black" : (isWhite ? "white" : "#377eb8"),
                width: isWhite ? "0.5px" : isBlack ? "2px" : "0.07%",
                marginLeft: isBlack ? "calc(-2px + 0.07%)" : "0"
            })
        }
        return _points;
    }

    $: points = calcPoints(selectedMinute);
</script>

<div class="car-timeline-by-day">
    <span class="day-label">{day}</span>
    <div class="car-timeline-by-day-container">
        {#each points as point (point.key)}
            <div class="minute-point" style="background-color: {point.color}; width: {point.width}; margin-left: {point.marginLeft}"/>
        {/each}
    </div>
</div>

<style>
    .car-timeline-by-day {
        height: 20px;
        white-space: nowrap;
        position: relative;
        margin: 2px 0px;
        vertical-align: middle;
    }

    .day-label {
        display: inline-block;
        text-align: right;
        width: 30px;
        line-height: 20px;
        vertical-align: top;
    }

    .car-timeline-by-day-container {
        display: inline-block;
        position: relative;
        height: 100%;
        width: 400px;
    }

    .minute-point {
        display: inline-block;
        height: 100%;
    }
</style>