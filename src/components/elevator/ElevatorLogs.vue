<template>
  <div class="space-y-2">
    <div class="flex items-center space-x-2">
      <span class="text-sm font-medium text-gray-700">Activity Log</span>
      <span class="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
        {{ logs.length }}
      </span>
    </div>
    
    <div class="bg-white rounded-lg p-2 max-h-32 overflow-y-auto space-y-1">
      <div v-for="(log, index) in logs" :key="index" 
        class="text-xs py-1 px-2 rounded bg-gray-50 text-gray-700 font-mono">
        {{ log }}
      </div>
      <div v-if="logs.length === 0" class="text-xs text-gray-500 italic text-center py-2">
        No activity yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  logs: string[]
}>()
</script> 