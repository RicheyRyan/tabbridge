<style>
  .tabList {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 450px;
    overflow: hidden;
  }
</style>

<ul class="tabList">
  <slot />
</ul>
