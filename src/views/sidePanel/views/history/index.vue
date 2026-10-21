<script setup lang="ts">
import type { BattleRecord } from 'extension'
import { battleRecord, buildRecord } from '~/logic'

function handleDetail(data: BattleRecord) {
  buildRecord.value = formatBuild(data)
  openPopupWindow('ExportRecord')
}
</script>

<template>
  <div flex flex-col flex-wrap gap-10px>
    <el-card v-for="data, idx in battleRecord" :key="idx" w-300px body-style="padding: 5px !important">
      <el-descriptions size="small" direction="vertical" :column="3" border>
        <el-descriptions-item label="Quest" label-width="60" :rowspan="2" align="center">
          <div relative>
            <img h-44px w-44px :src="getBossImg('enemy', data.imgId!, 's')">
            <div v-if="data.isSolo" class="absolute inset-x-0">
              <el-tag type="warning" effect="dark" size="small">
                solo
              </el-tag>
            </div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="Damage" label-width="113" align="center">
          {{ data.damage }}
        </el-descriptions-item>
        <el-descriptions-item label="Time/Speed" align="center">
          {{ getRealTimeSpeed(data).set }}
        </el-descriptions-item>
        <el-descriptions-item label="Honors" align="center">
          {{ data.point ? Math.floor(data.point).toLocaleString() : '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Turns" align="center">
          {{ data.turn }}
        </el-descriptions-item>
      </el-descriptions>
      <div mt-5px flex items-center justify-between>
        <div text-xs>
          {{ useDateFormat(data.startTimestamp, 'MM/DD HH:mm') }}
        </div>

        <div fc>
          <TheButton @click="handleDetail(data)">
            Details
          </TheButton>
        </div>
      </div>
    </el-card>
  </div>
</template>
