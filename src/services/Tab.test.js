import Tab from "./Tab";

const tabMock = {
  id: 1,
  index: 0,
  windowId: 1,
  highlighted: false,
  active: false,
  attention: false,
  pinned: false,
  status: "complete",
  hidden: false,
  discarded: false,
  incognito: false,
  width: 1280,
  height: 682,
  lastAccessed: 1580333395035,
  audible: false,
  mutedInfo: { muted: false },
  isArticle: false,
  isInReaderMode: false,
  sharingState: { camera: false, microphone: false },
  successorTabId: -1,
  url: "https://www.reddit.com/",
  title: "reddit: the front page of the internet",
  favIconUrl: "data:image/png;base64:test"
};

describe("Tab module", () => {
  it("Creates a tab data structure as expected", () => {
    expect(Tab.make(tabMock)).toEqual({
      favIconUrl: "data:image/png;base64:test",
      host: "reddit.com",
      id: 1,
      lastAccessed: 1580333395035,
      pinned: false,
      recent: false,
      selected: false,
      title: "reddit: the front page of the internet",
      url: "https://www.reddit.com/"
    });
  });
  it("Creates a tab handling an IP address as expected", () => {
    const tab = Tab.make({ ...tabMock, url: "http://127.0.0.1" });
    expect(tab.host).toEqual("127.0.0.1");
  });
});
