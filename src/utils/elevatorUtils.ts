import type { Elevator, Floor, Passenger } from '../types/elevator'

/**
 * Generates an array of floor objects for the elevator system
 * @param totalFloors - The total number of floors in the building
 * @returns Array of floor objects with initial null states for up/down requests
 */
export function generateFloors(totalFloors: number): Floor[] {
  return Array.from({ length: totalFloors }, (_, i) => ({
    id: i + 1,
    up: null,
    down: null
  }))
}

/**
 * Creates a new elevator instance with initial state
 * @param id - Unique identifier for the elevator
 * @param totalFloors - Total number of floors in the building
 * @returns A new elevator object with default values
 */
export function createElevator(id: number, totalFloors: number): Elevator {
  return {
    id,
    currentFloor: 1,
    direction: 'up',
    flors: generateFloors(totalFloors),
    passengers: [],
    nextStop: [],
    logs: []
  }
}

/**
 * Logs a message to the elevator's log array with timestamp
 * @param elevator - The elevator instance
 * @param message - The message to log
 */
export function log(elevator: Elevator, message: string) {
  const time = new Date().toLocaleTimeString()
  elevator.logs.unshift(`[${time}] ${message}`)
}

/**
 * Handles the pickup of passengers at a floor
 * Manages passenger creation, destination assignment, and floor request clearing
 * @param elevator - The elevator instance
 * @param floor - The floor where pickup is occurring
 */
export function handlePickup(elevator: Elevator, floor: Floor) {
  // Check if there are any waiting passengers (up or down request)
  const waitingPassengers = floor.up || floor.down ? 1 : 0
  if (waitingPassengers > 0) {
    const newPassenger: Passenger = {
      id: Date.now(),
      destinationFloor: Math.floor(Math.random() * 10) + 1,
      direction: floor.up ? 'up' : 'down'
    }
    
    // Special handling for top floor (10th floor)
    if (floor.id === elevator.flors.length) {
      // At top floor, passengers can only go down
      newPassenger.direction = 'down'
      // Ensure destination is below top floor
      while (newPassenger.destinationFloor >= floor.id) {
        newPassenger.destinationFloor = Math.floor(Math.random() * (floor.id - 1)) + 1
      }
    }
    // Special handling for bottom floor (1st floor)
    else if (floor.id === 1) {
      // At bottom floor, passengers can only go up
      newPassenger.direction = 'up'
      // Ensure destination is above bottom floor
      while (newPassenger.destinationFloor <= floor.id) {
        newPassenger.destinationFloor = Math.floor(Math.random() * (elevator.flors.length - 1)) + 2
      }
    }
    // Normal floor handling (2nd to 9th floor)
    else {
      if (floor.up) {
        // For up requests, ensure destination is above current floor
        while (newPassenger.destinationFloor <= elevator.currentFloor) {
          newPassenger.destinationFloor = Math.floor(Math.random() * (elevator.flors.length - elevator.currentFloor)) + elevator.currentFloor + 1
        }
      } else if (floor.down) {
        // For down requests, ensure destination is below current floor
        while (newPassenger.destinationFloor >= elevator.currentFloor) {
          newPassenger.destinationFloor = Math.floor(Math.random() * (elevator.currentFloor - 1)) + 1
        }
      }
    }

    // Add passenger to elevator and log the event
    elevator.passengers.push(newPassenger)
    log(elevator, `Picked up passenger going to floor ${newPassenger.destinationFloor}`)
    
    // Clear the floor request immediately after handling the pickup
    floor.up = false
    floor.down = false
    
    // Remove the floor from next stops
    elevator.nextStop = elevator.nextStop.filter(f => f !== floor.id)
  }
}

/**
 * Handles passenger drop-off at the current floor
 * Removes passengers who have reached their destination
 * @param elevator - The elevator instance
 */
export function dropOffPassengers(elevator: Elevator) {
  const passengersToDropOff = elevator.passengers.filter(p => p.destinationFloor === elevator.currentFloor)
  
  if (passengersToDropOff.length > 0) {
    // Remove passengers who reached their destination
    elevator.passengers = elevator.passengers.filter(p => p.destinationFloor !== elevator.currentFloor)
    // Remove current floor from next stops
    elevator.nextStop = elevator.nextStop.filter(floor => floor !== elevator.currentFloor)
    log(elevator, `${passengersToDropOff.length} passengers got off at floor ${elevator.currentFloor}`)
  }
}

/**
 * Moves the elevator based on its current direction
 * Handles direction changes at top and bottom floors
 * @param elevator - The elevator instance
 */
export function moveElevator(elevator: Elevator) {
  if (elevator.direction === 'up') {
    if (elevator.currentFloor < elevator.flors.length) {
      elevator.currentFloor++
      log(elevator, `Moved up to floor ${elevator.currentFloor}`)
    } else {
      // Reached top floor, change direction to down
      elevator.direction = 'down'
      elevator.currentFloor--
      log(elevator, `Reached top. Reversing to down → floor ${elevator.currentFloor}`)
    }
  } else {
    if (elevator.currentFloor > 1) {
      elevator.currentFloor--
      log(elevator, `Moved down to floor ${elevator.currentFloor}`)
    } else {
      // Reached bottom floor, change direction to up
      elevator.direction = 'up'
      elevator.currentFloor++
      log(elevator, `Reached bottom. Reversing to up → floor ${elevator.currentFloor}`)
    }
  }
}

/**
 * Generates random floor requests for the elevator
 * Handles special cases for top and bottom floors
 * @param elevator - The elevator instance
 */
export function generateRandomFloorRequest(elevator: Elevator) {
  const randomFloor = Math.floor(Math.random() * elevator.flors.length) + 1
  const floorIndex = elevator.flors.findIndex(f => f.id === randomFloor)

  if (floorIndex === -1) return

  const currentFloor = elevator.currentFloor

  // Handle requests at top floor (can only go down)
  if (randomFloor === elevator.flors.length) {
    elevator.flors[floorIndex] = {
      ...elevator.flors[floorIndex],
      down: true
    }
    elevator.nextStop.push(randomFloor)
    log(elevator, `Down request at floor ${randomFloor}`)
  } 
  // Handle requests at bottom floor (can only go up)
  else if (randomFloor === 1) {
    elevator.flors[floorIndex] = {
      ...elevator.flors[floorIndex],
      up: true
    }
    elevator.nextStop.push(randomFloor)
    log(elevator, `Up request at floor ${randomFloor}`)
  }
  // Handle requests for floors between current floor and top floor
  else if (randomFloor > currentFloor) {
    elevator.flors[floorIndex] = {
      ...elevator.flors[floorIndex],
      up: true
    }
    elevator.nextStop.push(randomFloor)
    log(elevator, `Up request at floor ${randomFloor}`)
  } 
  // Handle requests for floors between current floor and bottom floor
  else if (randomFloor < currentFloor) {
    elevator.flors[floorIndex] = {
      ...elevator.flors[floorIndex],
      down: true
    }
    elevator.nextStop.push(randomFloor)
    log(elevator, `Down request at floor ${randomFloor}`)
  }
} 