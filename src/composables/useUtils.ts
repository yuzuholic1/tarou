import { cloneDeep } from 'lodash-es'
import { combatPanelSetting } from '~/logic'

export function isGamePage(url?: string) {
  if (!url)
    return false

  const urlObj = new URL(url)
  const HOST = ['game.granbluefantasy.jp', 'gbf.game.mbga.jp']
  return HOST.includes(urlObj.host)
}

export function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}

export function deepClone<T>(obj: T): T {
  return cloneDeep(obj)
}

/**
 * Deep-merge the default config with the user config
 * @param defaultConfig Default config
 * @param userConfig User's current config
 * @returns A new merged config
 */
export function mergeConfig<T extends Record<string, any>>(defaultConfig: T, userConfig: Partial<T>): T {
  const result = {} as T

  // Walk only the default config to build the result
  for (const key in defaultConfig) {
    const defaultValue = defaultConfig[key]
    const userValue = userConfig[key]

    if (isPlainObject(defaultValue) && isPlainObject(userValue)) {
      // Both are objects: merge recursively
      result[key] = mergeConfig(defaultValue, userValue as any)
    }
    else if (userValue !== undefined) {
      // Use the user value if present
      result[key] = userValue
    }
    else {
      // Otherwise fall back to the default
      result[key] = defaultValue
    }
  }

  return result
}

/**
 * Check whether a value is a plain object
 */
function isPlainObject(obj: any): obj is Record<string, any> {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object
}

export function openPopupWindow(key: string) {
  const windowSize: Record<string, { height: number, width: number }> = {
    ArtifactBox: { height: 1000, width: 1300 },
    ArtifactRule: { height: 700, width: 700 },
    BuildCompare: { height: 900, width: 1100 },
    ExportRecord: { height: 800, width: 800 },
    NpcDetail: { height: 1000, width: 1000 },
    DungeonMap: { height: 1000, width: 1000 },
    RecoveryItem: { height: 1000, width: 900 },
    SampoSetup: { height: 900, width: 600 },
    SupportSummon: { height: 400, width: 700 },
  }

  const getWindowSize = (key: string) => {
    if (key.startsWith('WindowPanel')) {
      return { height: 800, width: 360 }
    }
    return windowSize[key] ?? { height: 800, width: 800 }
  }

  chrome.runtime.getContexts({}).then((ctx) => {
    if (key === 'ExportRecord' && ctx.some(c => c.documentUrl?.includes('popup/main.html?ExportRecord')))
      return

    chrome.windows.create({ url: `src/views/popup/main.html?${key}`, type: 'popup', ...getWindowSize(key) })
      .catch((err) => { createNotification({ message: String(err) }) })
  })
}

export function openCombatPanel() {
  chrome.windows.create({
    url: 'src/views/combatPanel/main.html',
    type: 'popup',
    width: combatPanelSetting.value.Container.width,
    height: combatPanelSetting.value.Container.height,
  })
    .catch((err) => { createNotification({ message: String(err) }) })
}
