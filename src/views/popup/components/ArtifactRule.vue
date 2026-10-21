<script setup lang="ts">
import { artifactSkillLevelList, artifactSkillList } from '~/constants/artifact'
import { artifactRule } from '~/logic'

const language = ref('en')
const skillTabs = ['skill1', 'skill2', 'skill3'] as const

const artifactGuideCollapse = ref([])

function toggleSkillLevel(skillId: number, level: number) {
  artifactRule.value[skillId] = level
}

function isSkillLevelActive(skillId: number, level: number) {
  return artifactRule.value[skillId] === level
}

function getSkillLevelType(skillId: number, level: number) {
  return isSkillLevelActive(skillId, level) ? artifactSkillLevelList.find(l => l.value === level)?.type : ''
}
</script>

<template>
  <el-collapse v-model="artifactGuideCollapse" m-auto w-600px>
    <el-collapse-item name="rules" title="How Rules Work">
      <div flex flex-col gap-3 text-14px text-neutral-4>
        <div>
          Every skill is rated one of 3 levels: Keep, Junk or Lock
        </div>
        <div>
          An artifact is marked as junk when it has no Lock skills and more than
          <el-input-number v-model="artifactRule.limit" :step="1" size="small" style="width: 50px;" :controls="false" />
          Junk skills.
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
  <el-card v-for="tab, i in skillTabs" :key="tab" :label="`Skill Group ${'I'.repeat(i + 1)}`" m-auto mt-10px w-600px>
    <template #header>
      <div fc>
        {{ `Skill Group ${'I'.repeat(i + 1)}` }}
      </div>
    </template>
    <div flex flex-col gap-2 overflow-auto>
      <div
        v-for="skill in artifactSkillList[tab]"
        :key="skill.skillId"
        class="border-#4C4D4F hover:bg-neutral-6"
        flex items-center justify-between gap-20px border-b-1 p-1 transition-colors last:border-b-0
      >
        <div min-w-0>
          <div text-14px>
            {{ language === 'ja' ? skill.name : skill.nameEn }}
          </div>
        </div>
        <div fc>
          <el-button
            v-for="level in artifactSkillLevelList"
            :key="level.value"
            :type="getSkillLevelType(skill.skillId, level.value)"
            @click="toggleSkillLevel(skill.skillId, level.value)"
          >
            {{ level.label }}
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>
