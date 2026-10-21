export function setupActionListener() {
  const { openSidePanel } = useContextMenu()

  chrome.action.onClicked.addListener((tab) => {
    if (!isGamePage(tab?.url)) {
      createNotification({ message: 'Please use this on the game page' })
      return
    }
    openSidePanel(tab)
  })
}
