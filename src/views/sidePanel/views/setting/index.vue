<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { defaultWidget } from '~/constants'
import { buildNpcFilter, notificationItem, notificationSetting, widgetList } from '~/logic'

function handleDelete(item: string) {
  const index = notificationItem.value.findIndex(i => i === item)
  notificationItem.value.splice(index, 1)
}

function updateNpcFilter(item: number) {
  const index = buildNpcFilter.value.findIndex(b => b === item)
  if (index !== -1)
    buildNpcFilter.value.splice(index, 1)
}

onMounted(() => {
  for (const widget of defaultWidget) {
    const hit = widgetList.value.find(w => w.key === widget.key)
    if (!hit)
      widgetList.value.push({ ...widget })
  }
  widgetList.value = widgetList.value.filter(widget =>
    defaultWidget.some(defaultWidget => defaultWidget.key === widget.key),
  )
})
</script>

<template>
  <el-alert :closable="false">
    <template #title>
      <div w-268px>
        <el-tooltip content="Click or drag to configure" placement="top-start">
          <span>
            Home Layout
          </span>
        </el-tooltip>
      </div>
    </template>
  </el-alert>

  <VueDraggableNext v-model="widgetList" my-10px flex flex-col gap-10px px-10px>
    <transition-group name="draglist">
      <div
        v-for="widget in widgetList" :key="widget.key"
        :class=" { 'bg-neutral-6!': !widget.visible }"
        cursor-grab select-none rounded-lg bg-teal-6 text-center text-14px leading-loose
        @click="widget.visible = !widget.visible"
      >
        {{ widget.name }}
      </div>
    </transition-group>
  </VueDraggableNext>

  <el-alert :closable="false">
    <template #title>
      <div w-268px flex items-center justify-between gap-2>
        <div>
          Notifications
        </div>
        <VolumeControl />
      </div>
    </template>
  </el-alert>
  <div flex flex-col pl-5>
    <el-checkbox v-model="notificationSetting.battleWin" label="Battle won" />
    <el-checkbox v-model="notificationSetting.battleLose" label="Party wiped" />
    <el-checkbox v-model="notificationSetting.replicardEvent" label="Replicard Sandbox chest" />
    <el-checkbox v-model="notificationSetting.appearanceQuest" label="Hell quest appeared" />
    <el-checkbox v-model="notificationSetting.itemGoal" label="Item goal reached" />
    <el-checkbox v-model="notificationSetting.sampoFinish" label="Advyrnture complete" />
    <el-checkbox v-model="notificationSetting.checkUpdate" label="Check for updates" />
    <el-checkbox v-model="notificationSetting.pointReach" label="Honors target reached" />
    <el-checkbox v-model="notificationSetting.actionTrigger" label="Action triggered" />
    <el-checkbox v-model="notificationSetting.cancelAutoUploadBuild" label="Do not auto-upload party builds" />
  </div>
  <el-alert :closable="false">
    <template #title>
      <div w-268px flex items-center justify-between gap-2>
        <el-tooltip content="Right-click an item image to track its drops" placement="top-start">
          <div>
            Drop Alerts
          </div>
        </el-tooltip>
        <el-switch v-model="notificationSetting.targetItemDrop" />
      </div>
    </template>
  </el-alert>
  <el-card my-10px>
    <div grid grid-cols-5 gap-10px>
      <div v-for="item in notificationItem" :key="item" relative fc flex-col select-none class="group">
        <img :src="getOfficialUrl(`/sp/assets${item}`)">
        <div absolute hidden h-full w-full fc bg-black opacity-70 group-hover:flex>
          <div i-carbon:close-filled absolute icon-btn @click="handleDelete(item)" />
        </div>
      </div>
    </div>
  </el-card>
  <el-alert :closable="false">
    <template #title>
      <div w-268px>
        <el-tooltip content="Click characters in Builds to set them" placement="top-start">
          <span>
            Unowned Characters
          </span>
        </el-tooltip>
      </div>
    </template>
  </el-alert>
  <el-card v-if="buildNpcFilter.length" my-10px>
    <div grid grid-cols-5 gap-10px>
      <div v-for="item in buildNpcFilter" :key="item" relative fc flex-col select-none class="group">
        <img :src="getAssetImg('npc', `${item}_01`, 's')">
        <div absolute hidden h-full w-full fc bg-black opacity-70 group-hover:flex>
          <div i-carbon:close-filled absolute icon-btn @click="updateNpcFilter(item)" />
        </div>
      </div>
    </div>
  </el-card>
</template>
