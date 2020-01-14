import sort from "ramda/src/sort";
import filter from "ramda/src/filter";
import pipe from "ramda/src/pipe";
import addIndex from "ramda/src/addIndex";
import reduce from "ramda/src/reduce";

const compareByStatus = (first, second, status) => {
  if (first[status]) {
    return -1;
  }
  if (second[status]) {
    return 1;
  }
  return 0;
};

const Tabs = {
  getCurrentWindowTabs() {
    return browser.tabs.query({ currentWindow: true });
  },
  getAllTabs() {
    return browser.tabs.query({});
  },
  sortBySection(tabs) {
    return sort((first, second) => {
      if (first.pinned || second.pinned) {
        return compareByStatus(first, second, "pinned");
      }
      if (first.host === "Other") {
        return 1;
      }
      if (second.host === "Other") {
        return -1;
      }
      if (first.host < second.host) return -1;
      if (first.host > second.host) return 1;
      if (first.host === second.host) return 0;
    }, tabs);
  },
  getSectionIndexes(tabs) {
    const reduceIndexed = addIndex(reduce);
    return reduceIndexed(
      (acc, { host }, i) => {
        if (acc[host]) {
          return acc;
        }
        return {
          ...acc,
          [host]: i
        };
      },
      {},
      tabs
    );
  },
  remove(tabs, tabToRemove) {
    return filter(tab => tab.id !== tabToRemove.id, tabs);
  },
  search(tabs, searchTerm) {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return pipe(
      filter(
        tab =>
          tab.title.toLowerCase().indexOf(lowerCaseTerm) > -1 ||
          tab.host.toLowerCase().indexOf(lowerCaseTerm) > -1
      ),
      Tabs.sortBySection
    )(tabs);
  }
};

export default Tabs;
