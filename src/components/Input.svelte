<script>
  export let ref = null;
  export let value = "";
</script>

<style>
  .input {
    color: #fff;
    font-weight: 500;
    padding: 1em;
    font-size: 16px;
    width: 100%;
    border: 0;
    background-color: #96a8c8;
  }
</style>

<input class="input" placeholder="Filter tabs" use:ref bind:value />
