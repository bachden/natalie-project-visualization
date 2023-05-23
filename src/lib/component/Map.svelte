<script>
  // @ts-nocheck

  import Point from "./Point.svelte";
  /**
   * @type {object[]}
   */
  export let points = [];
  /**
   * @type {number}
   */
  export let width;
  /**
   * @type {number}
   */
  export let height;

  function updateRenderedPoints(_points) {
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;

    for (const element of points) {
      if (element.globalX > maxX) maxX = element.globalX;
      if (element.globalX < minX) minX = element.globalX;
      if (element.globalY > maxY) maxY = element.globalY;
      if (element.globalY < minY) minY = element.globalY;
    }

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;

    return _points.map((element) => {
      return {
        ...element,
        scaledX: (width * (element.globalX - minX)) / rangeX,
        scaledY: (height * (element.globalY - minY)) / rangeY,
      };
    });
  }
</script>

<div class="map" style="width: {width}px; height: {height}px">
  {#each updateRenderedPoints(points) as point (point.key)}
    <Point
      top={height - point.scaledY}
      left={point.scaledX}
      color={point.color}
      highlight={point.highlight}
      tooltip={point.tooltip}
    />
  {/each}
</div>

<style>
  .map {
    display: inline-block;
    position: relative;
    margin: 20px;
    border: 1px solid #00000010;
    vertical-align: middle;
  }
</style>
