# Smart Elevator Control System

A modern, interactive elevator control system simulation that demonstrates real-time multi-elevator management with Vue 3. This project showcases advanced state management, TypeScript type safety, responsive design principles, and end-to-end testing with Cypress in a practical application.

##  Features

- Multi-elevator simulation (4 elevators)
- Real-time floor requests and passenger handling
- Smart direction management
- Visual feedback with direction indicators
- Comprehensive logging system
- Responsive design
- Modern UI with Tailwind CSS

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── elevator/
│   │       ├── Elevator.vue         # Main elevator component
│   │       ├── ElevatorStatus.vue   # Status display
│   │       ├── ElevatorLogs.vue     # Log display
│   │       ├── FloorDisplay.vue     # Floor indicators
│   │       └── PassengerInfo.vue    # Passenger information
│   ├── composables/
│   │   └── useElevatorSystem.ts     # Elevator system logic
│   │
│   ├── utils/
│   │   └── elevatorUtils.ts         # Utility functions
│   ├── types/
│   │   └── elevator.ts             # TypeScript types
│   ├── router/
│   │   └── index.js                # Vue Router configuration
│   ├── App.vue                     # Root component
│   └── main.js                     # Application entry point
├── cypress/
│   └── e2e/
│       └── elevator.cy.ts          # End-to-end tests
└── public/                        # Static assets
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing

The project uses Cypress for end-to-end testing. Here's how to run the tests:

1. First, start the development server:
```bash
npm run dev -- --host
```

2. In a new terminal window, open Cypress:
```bash
npm run cypress:open
```

3. In the Cypress Test Runner:
   - Click on "E2E Testing"
   - Choose your preferred browser (Chrome or Electron)
   - Click "Start E2E Testing"
   - Select "elevator.cy.ts" to run the tests

The tests will verify:
- Initialization of 4 elevators
- Correct floor display for each elevator
- Elevator status information
- Passenger information display
- Elevator logs
- Floor request handling
- Elevator movement

For headless testing (without UI), you can run:
```bash
npm run cypress:run
```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Key Components

### Elevator System
- Manages multiple elevators
- Handles floor requests
- Controls elevator movement
- Manages passenger pickup and dropoff

### Floor Display
- Shows current floor status
- Displays up/down request indicators
- Highlights current elevator position

### Passenger Management
- Tracks passenger count
- Manages passenger destinations
- Handles pickup and dropoff logic

### Logging System
- Records elevator movements
- Tracks passenger events
- Provides real-time status updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Toni Naumoski 
- [LinkedIn](https://www.linkedin.com/in/toni-naumoski-2859293b/)
- [Portfolio](https://toninaumoski.github.io/)