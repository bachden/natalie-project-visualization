<script>
  const width = 8;
  export let color = "black";
  export let highlight = false;
  export let top = 0;
  export let left = 0;
  export let tooltip = "";
</script>

<div
  class="point"
  style="background-color: {color}; 
    opacity: {highlight ? 1 : 0.01}; 
    top: {top - width / 2}px; 
    left: {left - width / 2}px;
    width: {width}px;
    height: {width}px;
    border-radius: {width / 2}px;"
>
  <span class="point-tooltip">{tooltip}</span>
</div>

<style>
  .point {
    display: block;
    position: absolute;
  }

  .point .point-tooltip {
    visibility: hidden;
    position: absolute;
    display: block;
    top: 10px;
    left: 10px;
    cursor: pointer;
    opacity: 1 !important;
  }

  .point:hover .point-tooltip {
    visibility: visible;
  }
</style>
