export interface Floor {
  id: number
  up: boolean | null
  down: boolean | null
}

export interface Passenger {
  id: number
  destinationFloor: number
  direction: 'up' | 'down'
}

export interface Elevator {
  id: number
  currentFloor: number
  direction: 'up' | 'down'
  flors: Floor[]
  logs: string[]
  passengers: Passenger[]
  nextStop: number[]
} 