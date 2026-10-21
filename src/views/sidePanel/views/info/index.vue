<script setup lang="ts">
import type { RemovableRef } from '@vueuse/shared'
import copy from 'copy-text-to-clipboard'
import { getConfig, setConfig, updateCode } from '~/api'
import { artifactRule, buildNpcFilter, code, combatPanelSetting, gachaRecord, markedUserList, notificationItem, notificationSetting, questConfig, questSetting, recoveryItemList, saveStoneDate, specBossBuff, specPlayerBuff, userInfo, volume, widgetList } from '~/logic/storage'

const { checkCode } = useUser()

const info = ref({
  permission: {
    notifications: 'granted',
  },
  version: '',
  userAgent: '',
})

function showSupport() {
  if (!userInfo.value.imgPc) {
    ElMessage.info('Support summon data not loaded yet')
    return
  }
  openPopupWindow('SupportSummon')
}

function handleCopy() {
  if (copy(code.value))
    ElMessage.success(`Copied transfer code`)
}

function changeCode() {
  if (!code.value) {
    ElMessage.info(`No transfer code generated yet`)
    return
  }

  ElMessageBox.prompt('Enter the new transfer code', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm' && instance.inputValue) {
        instance.confirmButtonLoading = true
        updateCode({ code: instance.inputValue }).then((data) => {
          code.value = data.code
          done()
        }).catch(() => {
          ElMessage.error('Migration failed')
        }).finally(() => {
          instance.confirmButtonLoading = false
        })
      }
      else {
        done()
      }
    },
  })
    .then(() => {
      ElMessage.success('Migration successful')
    })
    .catch(() => {})
}

const configMap: Record<string, RemovableRef<any>> = {
  volume,
  notificationSetting,
  notificationItem,
  gachaRecord,
  saveStoneDate,
  recoveryItemList,
  widgetList,
  specBossBuff,
  specPlayerBuff,
  questSetting,
  questConfig,
  markedUserList,
  artifactRule,
  buildNpcFilter,
  combatPanelSetting,
}

function handleGetConfig() {
  getConfig().then(({ data }) => {
    for (const key in configMap) {
      configMap[key].value = data[key] ?? configMap[key].value
    }
    ElMessage.success('Sync successful')
  }).catch((err) => {
    ElMessage.error(err.message)
  })
}

function handleSetConfig() {
  const config: Record<string, any> = {}
  for (const key in configMap) {
    config[key] = configMap[key].value
  }

  setConfig(config).then(() => {
    ElMessage.success('Upload successful')
  }).catch((err) => {
    ElMessage.error(err.message)
  })
}

onMounted(() => {
  checkCode()

  chrome.notifications.getPermissionLevel((level) => {
    info.value.permission.notifications = level
  })
  const manifest = chrome.runtime.getManifest()
  info.value.version = manifest.version
  info.value.userAgent = window.navigator.userAgent
})
</script>

<template>
  <el-descriptions :column="1" :border="true" direction="vertical" w-300px>
    <el-descriptions-item label="Player ID">
      <template #label>
        <div flex justify-between>
          <div>Player ID</div>
          <TheButton @click="showSupport">
            Support Summons
          </TheButton>
        </div>
      </template>
      {{ userInfo.uid ? userInfo.uid : 'Not loaded' }}
    </el-descriptions-item>
    <el-descriptions-item label="Transfer Code">
      <template #label>
        <div flex justify-between>
          <div>Transfer Code</div>
          <TheButton @click="changeCode">
            Migrate
          </TheButton>
        </div>
      </template>
      <div hover="text-teal-6" cursor-pointer @click="handleCopy">
        {{ code ? code : 'Not generated' }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Permissions">
      <div flex flex-col>
        <div flex justify-between>
          <div>Notifications</div>
          <el-tag :type="info.permission.notifications === 'granted' ? 'success' : 'danger'">
            {{ info.permission.notifications === 'granted' ? 'Allowed' : 'Blocked' }}
          </el-tag>
        </div>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="Version">
      {{ info.version }}
    </el-descriptions-item>
    <el-descriptions-item label="UserAgent">
      {{ info.userAgent }}
    </el-descriptions-item>
    <el-descriptions-item label="Links">
      <div flex flex-col>
        <div>
          <el-link href="https://waaatanuki.github.io/tarou-docs" target="_blank">
            Tarou User Guide
          </el-link>
        </div>
        <div>
          <el-link href="https://github.com/Waaatanuki/Chrome-Extension-Tarou" target="_blank">
            GitHub Repository
          </el-link>
        </div>
        <div>
          <el-link href="https://gbf.pub" target="_blank">
            Granblue Master
          </el-link>
        </div>
        <div>
          <el-link href="https://bbs.nga.cn/read.php?tid=30999435" target="_blank">
            NGA Thread
          </el-link>
        </div>
        <div>
          <el-link>QQ Group: 194260754</el-link>
        </div>
      </div>
    </el-descriptions-item>
  </el-descriptions>

  <div my-10px flex items-center justify-between px-4>
    <el-tooltip content="Upload your extension settings to the server">
      <TheButton class="w-1/2" @click="handleSetConfig">
        Upload Settings
      </TheButton>
    </el-tooltip>
    <el-tooltip content="Download your extension settings from the server">
      <TheButton class="w-1/2" @click="handleGetConfig">
        Sync Settings
      </TheButton>
    </el-tooltip>
  </div>

  <el-popover placement="bottom" width="300">
    <template #reference>
      <div hover="text-teal-6" m-auto mt-20px w-150px fc cursor-pointer gap-2>
        <div i-carbon:help-filled @click="openPopupWindow('Debug')" />
        <div>Troubleshooting</div>
      </div>
    </template>
    <img :src="getLocalImg('reload')">
  </el-popover>

  <div m-auto mt-10px w-150px text-12px>
    <a href="https://afdian.com/a/tarou" target="_blank" class="group">
      <div fc gap-1 rounded-lg px-4 py-2 group-hover=" text-yellow">
        <div
          i-ph-lightning-duotone group-hover="i-ph-lightning-fill"
          transition-all
        />
        <div>
          Support me on Afdian
        </div>
      </div>
    </a>
  </div>
</template>
