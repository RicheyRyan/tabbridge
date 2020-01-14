<script>
  import { onMount, afterUpdate } from "svelte";
  import map from "ramda/src/map";
  import pipe from "ramda/src/pipe";
  import Tabs from "./services/Tabs";
  import Tab from "./services/Tab";

  import Input from "./components/Input";
  import TabList from "./components/TabList";
  import TabItem from "./components/TabItem";

  let tabs = [];
  let filteredTabs = [];
  let sections = {};
  let selection = -1;
  let inputRef = null;
  let tabRef = [];
  let filterValue = "";
  let shouldReset = false;
  const tabActions = {
    normal: "normal",
    queryClose: "queryClose"
  };
  let action = tabActions.normal;
  let isQueryClose = action === tabActions.queryClose;

  const getTabs = async () => {
    const browserTabs = await Tabs.getCurrentWindowTabs();
    const tabs = map(Tab.make, browserTabs);
    return tabs;
  };

  const reset = async () => {
    shouldReset = false;
    filterValue = "";
    const currentTab = filteredTabs[selection];
    tabs = Tabs.remove(tabs, currentTab);
    filteredTabs = tabs;
    selection = -1;
    await Tab.close(currentTab);
  };

  onMount(async () => {
    tabs = await getTabs();
    filteredTabs = tabs;
    sections = Tabs.getSectionIndexes(filteredTabs);
  });

  afterUpdate(() => {
    isQueryClose = action === tabActions.queryClose;
    filteredTabs = Tabs.search(tabs, filterValue);
    sections = Tabs.getSectionIndexes(filteredTabs);
    if (selection === -1) {
      inputRef.focus();
    } else {
      tabRef[selection].focus();
    }
    if (shouldReset) {
      reset();
    }
  });

  const keyHandlers = {
    ArrowDown: () => {
      if (selection < tabs.length - 1) {
        selection += 1;
      } else {
        selection = -1;
      }
      action = tabActions.normal;
    },
    ArrowUp: () => {
      if (selection > -1) {
        selection -= 1;
      } else {
        selection = tabs.length - 1;
      }
      action = tabActions.normal;
    },
    ArrowRight: async () => {
      const currentTab = filteredTabs[selection];
      if (action === tabActions.normal && !currentTab.pinned) {
        action = tabActions.queryClose;
      } else if (action === tabActions.queryClose) {
        shouldReset = true;
        action = tabActions.normal;
      }
    },
    ArrowLeft: () => {
      if (action === tabActions.queryClose) {
        action = tabActions.normal;
      }
    }
  };

  const handleKeyStroke = ({ key }) => {
    const handler = keyHandlers[key];
    if (handler) handler();
  };

  const handleSelection = tab => {
    Tab.move(tab);
    window.close();
  };

  const setInputRef = el => (inputRef = el);
  const setTabRef = (el, i) => (tabRef[i] = el);
</script>

<style>
  .tabbridge {
    padding: 0;
    width: 400px;
  }
  .noResultsMsg {
    height: 40px;
    padding: 0.8em;
    margin: 0;
  }
  .hostHeader {
    display: block;
    font-size: 0.8em;
    width: 100%;
    margin: 0;
    padding: 10px 0 0 10px;
    text-transform: uppercase;
    font-weight: 500;
  }
</style>

<svelte:body on:keyup={handleKeyStroke} />

<article class="tabbridge">
  <Input bind:value={filterValue} ref={setInputRef} />
  <TabList>
    {#each filteredTabs as tab, index (tab.id)}
      {#if sections[tab.host] && sections[tab.host] === index}
        <p class="hostHeader">{tab.host}</p>
      {/if}
      <TabItem
        selected={selection === index}
        {action}
        {tab}
        onSelection={handleSelection}
        ref={el => setTabRef(el, index)} />
    {:else}
      <p class="noResultsMsg">No tabs matching that search</p>
    {/each}
  </TabList>
</article>
