<script>
  // @tcarDatak

  import Map from "$lib/component/Map.svelte";
  import { carData } from "$lib/store/car_data";

  /** @type {import('./$types').PageData} */
  export let data;

  let carId = -1;
  let prevCarId = -1;
  let nextCarId = -1;
  /**
   * @type {object[]}.
   */
  let points = [];

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
    return $carData.gpsCoordinates
      .filter(
        // @ts-ignore
        (element) => element["car_id"] == carId
      )
      .map((point) => {
        return {
          ...point,
          color: "blue",
          highlight: true,
        };
      });
  }

  $: points = update(data.carId);
</script>

<h2>Details for car {carId}</h2>
<a href="/cars">Overview</a>

{#if prevCarId >= 0}
  <a class="navigate-details" href="/cars/{prevCarId}">Previous Car</a>
{/if}

{#if nextCarId >= 0}
  <a class="navigate-details" href="/cars/{nextCarId}">Next Car</a>
{/if}

<Map width={300} height={300} {points} />
