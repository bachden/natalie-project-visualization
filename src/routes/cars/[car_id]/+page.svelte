<script>
// @ts-nocheck

  // @tcarDatak

  import CarTimeline from "$lib/component/CarTimeline.svelte";
import Map from "$lib/component/Map.svelte";
	// @ts-ignore
	import Point from "$lib/component/Point.svelte";
  import { carData } from "$lib/store/car_data";

  /** @type {import('./$types').PageData} */
  // @ts-ignore
  export let data;

  let carId = -1;
  let prevCarId = -1;
  let nextCarId = -1;
  /**
   * @type {object[]}.
   */
  let points = [];

  let maxCummulativeMinuteTotal = 0;
  let minuteOffset = 0 ;
  
  /**
   * @param {number} _carId
   */
  function update(_carId) {
    carId = _carId;
    let carList = $carData.carList;
    let index = carList.indexOf(carId);
    if (index < 0) throw "Could not find car by id " + carId;
    prevCarId = index > 0 ? carList[index - 1] : -1;
    nextCarId = index < carList.length - 1 ? carList[index + 1] : -1;
    points = $carData.gpsCoordinates
      .filter(
        // @ts-ignore
        (element) => element["car_id"] == carId
      )
      .map((point) => {
        return {
          ...point,
          // @ts-ignore
          tooltip: `day ${point.day} - minute ${point.cumulative_minute}`,
          color: "blue",
          highlight: true,
        };
      });
      const timeRange = $carData.timeRanges[carId];
      const minDay = timeRange.minDay;
      const maxDay = timeRange.maxDay;
      const totalDays = maxDay - minDay + 1;
      minuteOffset = maxCummulativeMinuteTotal = totalDays * 24 * 60;
  }

  function onMinuteOffsetChange(event) {
    points = points.map(point => {
        return {
            ...point,
            highlight: point.cumulative_minute_total <= minuteOffset
        }
    })
  }

  // @ts-ignore
  $: update(data.carId);
</script>

<h2>Details for car {carId}</h2>
<p><a href="/cars">Car overview</a></p>

{#if prevCarId >= 0}
  <a class="navigate-details" href="/cars/{prevCarId}">Previous Car</a>
{:else}
  <span>Previous Car</span>
{/if}

{#if nextCarId >= 0}
  <a class="navigate-details" href="/cars/{nextCarId}">Next Car</a>
{:else}
  <span>Next Car</span>
{/if}

<p>
    <input bind:value={minuteOffset} type="range" style="width: 320px" min="0" max="{maxCummulativeMinuteTotal}" step="1" on:input={onMinuteOffsetChange}/>
</p>

<Map width={300} height={300} {points} />

<CarTimeline carId={carId} selectedMinute={minuteOffset}/>
