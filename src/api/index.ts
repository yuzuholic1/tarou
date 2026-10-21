import type { BuildItem, DropInfo, StartJsonBoss, Stat } from 'api'
import type { Quest } from 'extension'
import request from './request'

// Update transfer code
export function updateCode(data: { code: string }) {
  return request<{ code: string }>('/ext/code', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Send drop info
export function sendDropInfo(data: DropInfo) {
  return request('/ext/drop', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Send drop info in bulk
export function sendMultiDropInfo(data: DropInfo[]) {
  return request('/ext/multiDrop', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Send boss info from startJson
export function sendBossInfo(data: StartJsonBoss) {
  return request('/ext/startJson', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Get quest info
export function listQuest() {
  return request<{ data: (Omit<Quest, 'visible'> & { deprecated?: boolean })[] }>('/ext/quest', {
    method: 'get',
  })
}

// Get drop statistics
export function listDrop(questIds: string[]) {
  return request<{ data: Stat[] }>('/ext/stat', {
    method: 'post',
    body: JSON.stringify(questIds),
  })
}

// Upload a build
export function uploadBuild(data: any) {
  return request<{ key: string }>('/ext/build/upsert', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Query the build list
export function listBuild(data: { questId: string, npcFilter: number[] }) {
  return request<{ data: { list: BuildItem[], total: number } }>('/ext/build/list', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Query build details
export function detailBuild(key: string, timestamp?: number) {
  const searchParams = new URLSearchParams({ key })

  if (timestamp)
    searchParams.set('t', `${timestamp}`)

  return request<{ data: { deck: any, detail: any } }>(`/ext/build/detail?${searchParams.toString()}`, {
    method: 'get',
  })
}

// Upload user extension settings
export function setConfig(data: any) {
  return request('/ext/config/set', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Query user extension settings
export function getConfig() {
  return request<{ data: any }>('/ext/config/get', {
    method: 'post',
  })
}
