<template>
  <div class="flex items-center space-x-3">
    <div class="flex items-center space-x-2">
      <div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold" data-test="current-floor">
        {{ elevator.currentFloor }}
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-medium text-gray-900">Floor {{ elevator.currentFloor }}</span>
        <span class="text-xs text-gray-500">
          {{ elevator.direction === 'up' ? 'Moving Up' : 'Moving Down' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Elevator } from '../../types/elevator'

defineProps<{
  elevator: Elevator
}>()
</script> 