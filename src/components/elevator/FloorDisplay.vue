<template>
  <div class="flex flex-col items-center group">
    <div
      class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 transform group-hover:scale-110"
      :class="[
        isCurrentFloor 
          ? 'bg-blue-500 text-white shadow-lg ring-4 ring-blue-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      ]"
    >
      {{ floor.id }}
    </div>
    <!-- Up/Down Indicators -->
    <div class="flex space-x-1 mt-2">
      <div
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="[
          floor.down 
            ? 'bg-red-500 shadow-sm shadow-red-200' 
            : 'bg-gray-200 group-hover:bg-gray-300'
        ]"
        data-test="down-request"
      ></div>
      <div
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="[
          floor.up 
            ? 'bg-green-500 shadow-sm shadow-green-200' 
            : 'bg-gray-200 group-hover:bg-gray-300'
        ]"
        data-test="up-request"
      ></div>
    </div>
    <span class="text-xs mt-1 text-gray-500 font-medium">F{{ floor.id }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Floor } from '../../types/elevator'

defineProps<{
  floor: Floor
  isCurrentFloor: boolean
}>()
</script> 