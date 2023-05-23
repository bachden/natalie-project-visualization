<script>
  // @ts-nocheck

  import Map from "$lib/component/Map.svelte";
  import { carData } from "$lib/store/car_data";

  const colors = {
    professional: "red",
    catering: "green",
    domestic: "orange",
    housing: "blue",
    other: "yellow",
  };

  /**
   * @type {number}
   */
  let selected;

  const mapWidth = 600;
  const mapHeight = 600;

  /**
   * @type {object[]}
   */
  let points = [...$carData.gpsCoordinates, ...$carData.interest];
  /**
   * @param {int} _selected
   */
  function updatePoints(_selected, _points) {
    return _points.map((element) => {
      let highlight = true;
      const carId = element["car_id"];
      if (carId) {
        highlight = _selected == carId;
      }
      return {
        ...element,
        highlight,
        tooltip: carId ? `Car ${carId}` : `${element.name} (${element.type})`,
        color: carId ? "black" : colors[element["type"]],
      };
    });
  }
  // @ts-ignore
  $: points = updatePoints(selected, points);
</script>

<h2>Overview</h2>

<p>
    <select bind:value={selected}>
      <option value={undefined}>-</option>
      {#each $carData.carList as carId}
        <option value={carId}>
          Car {carId}
        </option>
      {/each}
    </select>
    {#if selected}
      <a href="/cars/{selected}">Details for car {selected}</a>
    {/if}
</p>

<Map width={mapWidth} height={mapHeight} {points} />
