import { notificationItem } from '~/logic'

export function setupContextMenuListener() {
  const { openSidePanel, openWindowPanel } = useContextMenu()

  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (!isGamePage(tab?.url)) {
      createNotification({ message: 'Please use this on the game page' })
      return
    }

    if (!tab?.id) {
      createNotification({ message: 'Please use this on the game page' })
      return
    }

    switch (info.menuItemId) {
      case 'openSidePanel':{
        openSidePanel(tab)
        break
      }
      case 'openWindowPanel':{
        openWindowPanel(tab)
        break
      }
      case 'pushInTargetItem':
        if (info.srcUrl) {
          const itemKey = imgSrcToKey(info.srcUrl)

          if (!itemKey) {
            createNotification({ message: 'This item cannot be added' })
            return
          }
          if (notificationItem.value.includes(itemKey)) {
            createNotification({ message: 'This item is already being tracked' })
            return
          }

          notificationItem.value.push(itemKey)
          createNotification({
            message: 'Added',
            iconUrl: getOfficialUrl(`/sp/assets${itemKey}`),
            sound: 'tip',
          })
        }
        break
    }
  })
}
