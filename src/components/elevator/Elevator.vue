<template>
  <div class="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl" data-test="elevator">
    <div class="flex items-center justify-between mb-4">
      <ElevatorStatus :elevator="elevator" />
      <div class="flex items-center space-x-2">
        <span class="px-3 py-1 rounded-full text-sm font-medium"
          :class="elevator.direction === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
          data-test="direction">
          {{ elevator.direction === 'up' ? '↑' : '↓' }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-10 gap-3 mb-4">
      <FloorDisplay
        v-for="floor in elevator.flors"
        :key="floor.id"
        :floor="floor"
        :is-current-floor="elevator.currentFloor === floor.id"
        data-test="floor-display"
      />
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <div class="bg-gray-50 rounded-lg p-3 flex-1 min-w-0" data-test="passenger-info">
        <PassengerInfo :passengers="elevator.passengers" />
      </div>
      <div class="bg-gray-50 rounded-lg p-3 flex-1 min-w-0" data-test="elevator-logs">
        <ElevatorLogs :logs="elevator.logs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ElevatorStatus from './ElevatorStatus.vue'
import ElevatorLogs from './ElevatorLogs.vue'
import FloorDisplay from './FloorDisplay.vue'
import PassengerInfo from './PassengerInfo.vue'
import type { Elevator } from '../../types/elevator'

defineProps<{
  elevator: Elevator
}>()
</script> 