<template>
  <div class="space-y-2">
    <div class="flex items-center space-x-2">
      <span class="text-sm font-medium text-gray-700">Passengers</span>
      <span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
        {{ passengers.length }}
      </span>
    </div>
    
    <div class="space-y-1">
      <div v-for="p in passengers" :key="p.id" 
        class="flex items-center justify-between text-xs bg-white rounded px-2 py-1">
        <span class="text-gray-600">To Floor {{ p.destinationFloor }}</span>
        <span class="px-1.5 py-0.5 rounded text-xs font-medium"
          :class="p.direction === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          {{ p.direction === 'up' ? '↑' : '↓' }}
        </span>
      </div>
      <div v-if="passengers.length === 0" class="text-xs text-gray-500 italic">
        No passengers
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Passenger } from '../../types/elevator'

defineProps<{
  passengers: Passenger[]
}>()
</script> 