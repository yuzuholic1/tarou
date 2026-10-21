export default function useContextMenu() {
  function registerContextMenu() {
    chrome.contextMenus.create({ id: 'openSidePanel', title: 'Open Side Panel', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'openWindowPanel', title: 'Open Window Panel', contexts: ['all'] })
    chrome.contextMenus.create({ id: 'pushInTargetItem', title: 'Add to Drop Tracker', contexts: ['image'] })
  }

  function openSidePanel(tab: chrome.tabs.Tab) {
    chrome.sidePanel.open({ tabId: tab.id! }).catch((err) => {
      createNotification({ message: String(err) })
    })
  }

  function openWindowPanel(tab: chrome.tabs.Tab) {
    openPopupWindow(`WindowPanel${tab.id}`)
  }

  return { registerContextMenu, openSidePanel, openWindowPanel }
}
