import { onMessage, sendMessage } from 'webext-bridge/content-script'

(() => {
  // Capture drop data
  onMessage('getBattleResult', () => {
    return new Promise((resolve) => {
      const start = setInterval(() => {
        if (!/\/#result(?:_multi)?\/\d+/.test(document.URL)) {
          console.log('Battle results detection aborted', document.URL)
          clearInterval(start)
          resolve({})
        }

        console.log('Battle results detected')
        const targetEl = document.querySelector('.prt-item-list')

        if (targetEl) {
          clearInterval(start)
          resolve({ domStr: targetEl.outerHTML })
        }
      }, 200)
    })
  })

  // Capture drop data from battle history
  onMessage('getBattleHistoryResult', () => {
    return new Promise((resolve) => {
      const start = setInterval(() => {
        if (!document.URL.includes('#result_multi/detail')) {
          console.log('History results detection aborted', document.URL)
          clearInterval(start)
          resolve({})
        }

        console.log('History results detected')
        const targetEl = document.querySelector('.prt-result-detail')

        if (targetEl) {
          clearInterval(start)
          resolve({ domStr: targetEl.outerHTML })
        }
      }, 200)
    })
  })

  // Capture support summon info
  onMessage('getSupportSummon', () => {
    return new Promise((resolve) => {
      const start = setInterval(() => {
        if (!document.URL.includes('#profile')) {
          console.log('Profile page detection aborted', document.URL)
          clearInterval(start)
          resolve({})
        }

        console.log('Profile page detected')
        const targetEl = document.querySelector('.cnt-profile')

        if (targetEl) {
          clearInterval(start)
          resolve({ domStr: targetEl.outerHTML })
        }
      }, 200)
    })
  })

  // Capture character info
  onMessage('getNpczenith', () => {
    return new Promise((resolve) => {
      const start = setInterval(() => {
        if (!document.URL.includes('#zenith')) {
          console.log('Character detection aborted', document.URL)
          clearInterval(start)
          resolve({})
        }

        console.log('Character details detected')
        const targetEl = document.querySelector('div.cnt-zenith.npc')

        if (targetEl) {
          clearInterval(start)
          resolve({ domStr: targetEl.outerHTML })
        }
      }, 200)
    })
  })

  // Capture home page info
  onMessage('getMypage', () => {
    return new Promise((resolve) => {
      const start = setInterval(() => {
        if (!document.URL.includes('#mypage')) {
          console.log('Home page detection aborted', document.URL)
          clearInterval(start)
          resolve({})
        }

        console.log('Home page detected')
        const targetEl = document.querySelector('#status-accordion-wrapper')
        const contentEl = document.querySelector('.contents')

        if (targetEl && contentEl) {
          clearInterval(start)
          resolve({ domStr: contentEl.outerHTML })
        }
      }, 200)
    })
  })

  function injectScript() {
    const script = document.createElement('script')
    script.async = true
    const params = new URLSearchParams({
      extensionId: chrome.runtime.id,
    })
    script.src = chrome.runtime.getURL(`inject.js?${params}`)
    const doc = document.head || document.documentElement
    doc.appendChild(script)
    document.addEventListener(chrome.runtime.id, async (e) => {
      sendMessage('express', (e as CustomEvent).detail, 'background')
    })
  }

  injectScript()
})()
