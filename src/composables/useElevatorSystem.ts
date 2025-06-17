import { ref } from 'vue'
import type { Elevator } from '../types/elevator'
import { createElevator, moveElevator, dropOffPassengers, handlePickup, generateRandomFloorRequest } from '../utils/elevatorUtils'

export function useElevatorSystem(totalFloors: number = 10) {
  const elevators = ref<Elevator[]>([])
  let moveIntervalId: ReturnType<typeof setInterval> | null = null
  const elevatorStates = ref<{ [key: number]: 'moving' | 'stopped' }>({})

  function initializeElevators(count: number) {
    elevators.value = Array.from({ length: count }, (_, i) => {
      elevatorStates.value[i + 1] = 'moving'
      return createElevator(i + 1, totalFloors)
    })
  }

  function handleElevatorStop(elevator: Elevator) {
    // Set elevator state to stopped
    elevatorStates.value[elevator.id] = 'stopped'
    
    // Handle passenger operations
    dropOffPassengers(elevator)
    
    const currentFloorObj = elevator.flors.find(f => f.id === elevator.currentFloor)
    if (currentFloorObj && (currentFloorObj.up || currentFloorObj.down)) {
      handlePickup(elevator, currentFloorObj)
    }

    // After 10 seconds, set elevator back to moving
    setTimeout(() => {
      elevatorStates.value[elevator.id] = 'moving'
    }, 10000)
  }

  function startSystem() {
    if (moveIntervalId) {
      clearInterval(moveIntervalId)
    }
    
    moveIntervalId = setInterval(() => {
      elevators.value.forEach(elevator => {
        // Only move elevator if it's not in stopped state
        if (elevatorStates.value[elevator.id] === 'moving') {
          moveElevator(elevator)
          
          // Check if elevator needs to stop at current floor
          const currentFloorObj = elevator.flors.find(f => f.id === elevator.currentFloor)
          const hasPassengersToDropOff = elevator.passengers.some(p => p.destinationFloor === elevator.currentFloor)
          const hasPassengersToPickUp = currentFloorObj && (currentFloorObj.up || currentFloorObj.down)

          if (hasPassengersToDropOff || hasPassengersToPickUp) {
            handleElevatorStop(elevator)
          }
        }
      })

      // Generate random floor requests
      elevators.value.forEach(generateRandomFloorRequest)
    }, 10000)
  }

  function stopSystem() {
    if (moveIntervalId) {
      clearInterval(moveIntervalId)
      moveIntervalId = null
    }
  }

  return {
    elevators,
    initializeElevators,
    startSystem,
    stopSystem
  }
} 