import pick from "ramda/src/pick";
import tail from "ramda/src/tail";
import pipe from "ramda/src/pipe";
import join from "ramda/src/join";
import split from "ramda/src/split";

const removeSubDomain = url => {
  const domains = split(".", url);
  if (domains.length === 2) {
    return url;
  }
  return pipe(tail, join("."))(domains);
};

const Tab = {
  make(tab) {
    const pickedKeys = pick(
      ["id", "pinned", "url", "title", "favIconUrl", "lastAccessed"],
      tab
    );
    const url = new URL(tab.url);
    const newHost = removeSubDomain(url.host);
    return {
      ...pickedKeys,
      host: newHost || "Other",
      selected: false,
      recent: Tab.getRecentStatus(pickedKeys)
    };
  },
  /**
   * Return whether tab is recent
   * @param {object} tab
   */
  getRecentStatus(tab) {
    const recentNumberOfSeconds = 30;
    const now = new Date();
    const diff = now - tab.lastAccessed / 1000;
    const lastAccessedInSeconds = Math.floor(diff % 60);
    return lastAccessedInSeconds < recentNumberOfSeconds;
  },
  close(tab) {
    browser.tabs.remove(tab.id);
  },
  move(tab) {
    browser.tabs.update(tab.id, {
      active: true
    });
  }
};

export default Tab;
