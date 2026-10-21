<script setup lang="ts">
import { eventList } from '~/logic'

const eventInfo = computed(() => eventList.value.find(event => event.type === 'biography'))
const articleIitemNum = computed(() => Object.values (eventInfo.value?.additional || {}).join(' | '))
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          Story Event{{ `( ${articleIitemNum} )` }}
        </div>
        <el-tooltip content="Last updated" placement="top">
          {{ formatEventDate(eventInfo.updateTime) }}
        </el-tooltip>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <MissionList :mission-list="eventInfo.mission" />
      <el-alert v-if="eventInfo.mission.length === 0" title="Event missions not available yet" type="info" :center="true" :closable="false" />
    </div>
  </el-card>
</template>
