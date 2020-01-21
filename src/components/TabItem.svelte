<script>
  export let selected = false;
  export let tab = null;
  export let action = null;
  export let ref = null;
  export let onSelection = null;
  export let onFocus = null;

  const { pinned, favIconUrl: favicon, title, id, url } = tab;
</script>

<style>
  .tabItem {
    list-style: none;
    display: block;
  }
  .unpinnedItem {
    width: 100%;
  }
  .tabLink {
    height: 40px;
    padding: 0.8em;
    color: #333;
    display: flex;
    align-items: center;
    text-decoration: none;
    outline: none;
  }
  .tabLink:hover,
  .selected {
    background-color: #96a8c8;
    color: #ffffff;
    font-weight: 500;
  }
  .pinnedLink {
    padding: 10px;
    justify-content: center;
    margin-right: auto;
  }
  .unpinnedLink {
    padding: 0.8em;
    box-sizing: border-box;
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .close {
    background-color: #ff0000;
    color: #ffffff;
    font-weight: 500;
  }
  .favicon {
    margin-right: 10px;
  }
  .pinnedFavicon {
    margin-right: 0;
  }
</style>

<li class="tabItem" class:unpinnedItem={!pinned}>
  {#if selected && action === 'queryClose'}
    <div class="tabLink close">
      {#if favicon}
        <img src={favicon} alt={title} width="20" height="20" class="favicon" />
      {/if}
      Close?
    </div>
  {:else}
    <a
      href={url}
      class="tabLink"
      class:selected
      class:pinnedLink={pinned}
      class:unpinnedLink={!pinned}
      use:ref
      on:focus|preventDefault={onFocus}
      on:click|preventDefault={() => onSelection(tab)}
      on:enter={() => onSelection(id)}>
      {#if favicon}
        <img
          src={favicon}
          alt={title}
          width="20"
          height="20"
          class="favicon"
          class:pinnedFavicon={pinned} />
      {/if}
      {#if !pinned}
        <span class="title">{title}</span>
      {/if}
    </a>
  {/if}
</li>
