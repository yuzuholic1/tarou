<script setup lang="ts">
import type { EventInfo, TeamraidAdditional } from 'extension'
import { Icon } from '@iconify/vue'
import { eventList } from '~/logic'

type TeamraidInfo = EventInfo & { additional: TeamraidAdditional }
const eventInfo = computed(() => eventList.value.find(event => event.type === 'teamraid') as TeamraidInfo)
const record = computed(() => eventInfo.value?.additional.record)

async function exportToImg() {
  try {
    const element = document.querySelector(`#teamraid-container`)!
    const result = await useSnapdom(element)
    await result.download({ scale: 1.5, type: 'png', filename: `unite-and-fight-${eventInfo.value?.additional.eventNo}-record`, backgroundColor: '#131313' })
    ElMessage.success('Saved')
  }
  catch (error) {
    createNotification({ message: String(error) })
  }
}
</script>

<template>
  <div fixed right-20px top-300px h-40px w-40px fc cursor-pointer rounded-full hover:bg-teal-9 @click="exportToImg">
    <Icon icon="streamline-flex:screenshot" text-25px text-teal-6 />
  </div>
  <div p-4>
    <div id="teamraid-container" m-auto w-400px fc flex-col gap-10px rounded p-10px leading-10px ring-1 ring-neutral-7>
      <div my-10px text-20px>
        Unite and Fight #{{ eventInfo?.additional.eventNo }}
      </div>
      <div v-if="record?.user" v-html="record.user" />
      <el-alert v-else title="No individual ranking data yet" type="info" :closable="false" show-icon center />
      <div v-if="record?.guild" v-html="record.guild" />
      <el-alert v-else title="No crew ranking data yet" type="info" :closable="false" show-icon center />
      <div v-if="record?.log" v-html="record.log" />
      <el-alert v-else title="No crew battle record yet" type="info" :closable="false" show-icon center />
    </div>
  </div>
</template>
