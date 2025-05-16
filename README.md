# 🗓️ Slots Reservation Vue 3 Application

The Solution is focused on the management of reservation slots
management of reservation slots for truckers to pick up and deliver containers at terminals. Your task is to create a web application
that displays and dynamically updates the capacity of time slots for these reservations on incoming events.

## Project Structure

This project consists of several key modules that handle data fetching, real-time updates, UI rendering, and utility logic.

### Application flow

- **Initial Data Fetch**: On app mount, the app fetches time slot data from the `/timeSlots` REST endpoint.
- **Data Adapter**: Slot data is enriched with mock fields like `instructor` and `location` grouped by date and time.
- **Server-Sent Events (SSE)**: The app listens to the `/sse` endpoint for real-time updates (capacity and category changes).
- **Toast Notification Service**: A custom notification system alerts the user of live slot updates.
- **Search and Filter**: Users can filter slots by instructor, location, category, and limit results.
- **Dynamic UI Rendering**: The slot list is grouped by date and time and visually styled based on `category` (green, yellow, red).

## Requirements Implemented

✅ Initial data is fetched from the `/timeSlots` endpoint  
✅ Real-time updates handled via SSE from the `/sse` endpoint  
✅ Capacity and category updates are applied live  
✅ Visual display of start time, end time, current / max capacity, and category  
✅ Grouping of time slots by date and time  
✅ Dynamic color styling (green, yellow, red)  
✅ Toast notifications show update events  
✅ Search and filter by instructor, location, and category  
✅ Unit tests for important functionality  
✅ Code written in TypeScript using Vue 3 Composition API

### Installation

To get the project running locally:

```bash
git clone https://github.com/gitsheyno/slots_reservation.git
cd slots_reservation
npm install
npm run dev
npm run test
```

## TechStack

- Vue3 and complete composition API
- Typescript
- as CSS library I have used Tailwind CSS
- as State management, Global state i have used Pinia for Toaser and for components local States like ref
- date-fs for formating date
- Vitest

## design choices

- I have implemented multiple layer components to seperate the concerns like presentation layer, API layer, application layer, reusabiliy

- abstracted out the fetch logic in a compsoable and dident use tools like tanstack query since it was just about inital load and only fetch API was enough.

- i have used adaptor layer first to add additional data to Slots like instructor and location, then i have grouped slots base don date and time.
- to handle fetched data i used local states, since using props in this case was enough and using global state was not requiered.
- abstracted out connection to server to get the real time updates using EventSource.
- i havent use any UI-library and tried to show my skills creating UI and used Tailwind to style.
- For real-time updates, I followed a pattern of centralized data updates:
  • The parent component holds and manages the grouped data.
  • On receiving an SSE event, the parent updates the corresponding slot item directly.
  • The v-for loop then automatically re-renders the updated data.
- I have implemented Toaster using Pinia state management to send notification for each update
- For a better user experience, I added search, filtering, and limiting capabilities:
  • Users can filter by instructor, location, or category.
  • Custom input fields and dropdown components were created without external libraries.
- For statefull logics like fetching data and handling SSE i have used composable.
- I have kept all adaptor and helper functions in utility file
