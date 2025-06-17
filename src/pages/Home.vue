<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold text-center mb-6">Smart Elevator Control System</h1>

    <div class="space-y-6 max-w-5xl mx-auto">
      <Elevator
        v-for="elevator in elevators"
        :key="elevator.id"
        :elevator="elevator"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Elevator from '../components/elevator/Elevator.vue'
import { useElevatorSystem } from '../composables/useElevatorSystem'

const { elevators, initializeElevators, startSystem, stopSystem } = useElevatorSystem()

onMounted(() => {
  initializeElevators(4) // Initialize 4 elevators
  startSystem()
})

onUnmounted(() => {
  stopSystem()
})
</script>

<style scoped>
</style>
