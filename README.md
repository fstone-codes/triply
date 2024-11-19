# Triply

## Overview

Triply is a streamlined, interactive app designed to simplify trip planning. It consolidates essential travel tasks into one platform, making travel preparation efficient, collaborative, and enjoyable.

### Problem Space

Planning a trip is a juggling act, especially when it involves multiple people. You want to make the most of your budget, but that means managing details like expenses, itineraries, packing lists, and everyone’s preferences. Existing tools either focus on just one part of the process or require heavy customization to meet specific needs, forcing travelers to switch between multiple apps and deal with complicated inputs and cluttered results.

### User Profile

-   Group travelers
    -   Coordinate shared events on a collaborative itinerary
    -   Create and share packing lists for group members
    -   Split expenses and track payments to ensure everyone is on the same page
    -   Share travel-related updates and tasks for seamless communication
-   Budget-conscious travelers
    -   Set up a trip budget and track expenses in real-time
    -   Plan activities, meals, and lodging within budget limits
    -   Get reminders for payments and avoid surprises through organized expense tracking
    -   Compare prices for activities and services to make informed choices
-   Frequent travelers
    -   Save reusable itineraries, packing lists, and preferred destinations for future trips
    -   Quickly adapt old trip plans to new destinations or dates
    -   Access a history of past trips for reference and optimization
    -   Reuse or modify saved lists for frequent trips (e.g., business, family vacations)
-   Outdoor enthusiasts
    -   Plan hiking, camping, and adventure trips with specialized packing lists (e.g., gear, food, first aid)
    -   Coordinate meeting locations and transport logistics for group outdoor activities
    -   Track weather forecasts, outdoor activity options, and safety details
    -   Share event details and coordinate with other participants in real-time

### Features

-   User Setup
    -   The user can create an account to manage trip planning projects
    -   The user can login to their existing account to manage trip planning projects
-   Trip Planning
    -   The logged in user can see a summary of their trips on their dahsboard
    -   The logged in user can create a new trip, outlining the parameters of the trip
    -   The logged in user can create, remove or modify itinerary items
    -   The logged in user can create, remove or modify lists
    -   The logged in user can create, remove or modify list items

## Implementation

### Tech Stack

-   React
-   MySQL
-   Express
-   Thunder Client
-   Client libraries:
    -   react
    -   react-router
    -   sass
    -   axios
    -   react-big-calendar
-   Server libraries:
    -   knex
    -   express
    -   dotenv
    -   cors
    -   uuid
    -   bcrypt
    -   jsonwebtoken

### APIs

-   No external APIs will be used for the first sprint

### Sitemap

-   Home page
-   Register
-   Login
-   User dashboard
-   Trip initialization
-   Trip itinerary
-   Trip lists

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

<!-- - imagine you are a user that logs into website
- is there any data you should be seeing at first
- is there something the user must do or click etc
- any forms user must complete
- go thru entire process of user going through your website -->

#### User Endpoints

**POST `/api/users/register`**

-   Add a user account

Parameters:

```
{
    "firstName": "<users first name>",
    "lastName": "<users last name>",
    "username": "<users username>",
    "email": "<users email>",
    "password": "<users provided password>"
}
```

Response:

```
{
    "message": "Successful registry"
}
```

**POST `/api/users/login`**

-   Login as an existing user

Parameters:

```
{
    "email": "<users email>",
    "password": "<users provided password>"
}
```

Response:

```
{
    "message": "Successful login"
}
```

#### Trip Endpoints

**POST `/api/trips`**

-   Create a trip

Parameters:

```
{
    "userId": "<user id>",
    "tripName": "<trip name>",
    "destination": "<trip destination>",
    "startDate": "<trip start date>",
    "endDate": "<trip end date>",
}
```

Response:

```
{
    "id": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "userId": "091de676-61af-4ee6-90de-3a7a53af7521",
    "tripName": "Adventure Time",
    "destination": "Multiverse",
    "startDate": "2025-03-01",
    "endDate": "2025-03-15"
}
```

**GET `/api/trips/:userId`**

-   Retrieve all trips for a user

Response:

```
[
    {
        "id": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "userId": "091de676-61af-4ee6-90de-3a7a53af7521",
        "tripName": "Adventure Time",
        "destination": "Multiverse",
        "startDate": "2025-03-01",
        "endDate": "2025-03-15"
    }
    {
        "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
        "userId": "091de676-61af-4ee6-90de-3a7a53af7521",
        "tripName": "Tropical Getaway",
        "destination": "Bikini Bottom",
        "startDate": "2025-07-04",
        "endDate": "2025-07-20"
    }
    {
        "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
        "userId": "091de676-61af-4ee6-90de-3a7a53af7521",
        "tripName": "35th Birthday",
        "destination": "Scranton",
        "startDate": "2025-08-08",
        "endDate": "2025-08-10",
    }
]
```

**PUT `/api/trips/:tripId`**

-   Update a trips details
-   No POST body expected

Response:

```
{
    "id": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "userId": "091de676-61af-4ee6-90de-3a7a53af7521",
    "tripName": "Adventure Time",
    "destination": "Candy Kingdom",
    "startDate": "2025-02-28",
    "endDate": "2025-03-15"
}
```

**DELETE `/api/trips/:tripId`**

-   Delete a trip

Response:

```
{
    "id": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "userId": "091de676-61af-4ee6-90de-3a7a53af7521",
    "tripName": "Adventure Time",
    "destination": "Multiverse",
    "startDate": "2025-03-01",
    "endDate": "2025-03-15"
}
```

#### List Endpoints

**POST `/api/lists`**

-   Create a list

Parameters:

```
{
    "tripId": "<trip id>",
    "listName": "<list name>",
    "items": []
}
```

Response:

```
{
    "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
    "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "listName": "Packing",
    "item": []
}
```

**GET `/api/lists/:tripId`**

-   Retrieve all lists for a trip

Response:

```
[
    {
        "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "listName": "Packing",
        "item": "Toothbrush",
        "description": "Don't forget to charge your toothbrush!",
        "status": "In Progress",
        "category": "Toiletries"
    }
    {
        "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "listName": "Groceries",
        "item": "Toothbrush",
        "description": "Don't forget to charge your toothbrush!",
        "status": "In Progress",
        "category": "Toiletries"
    }
    {
        "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "listName": "Packing",
        "item": "Toothbrush",
        "description": "Don't forget to charge your toothbrush!",
        "status": "In Progress",
        "category": "Toiletries"
    }
]
```

**PUT `/api/lists/:listId`**

-   Update a lists details
-   No POST body expected

Response:

```
{
    "id": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14"
    "tripId": "091de676-61af-4ee6-90de-3a7a53af7521"
    "listName": "Adventure Time"
    "destination": "Candy Kingdom"
    "startDate": "2025-02-28"
    "endDate": "2025-03-15"
}
```

**DELETE `/api/lists/:listId`**

-   Delete a list

Response:

```
{
    "id": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14"
    "tripId": "091de676-61af-4ee6-90de-3a7a53af7521"
    "listName": "Adventure Time"
    "destination": "Multiverse"
    "startDate": "2025-03-01"
    "endDate": "2025-03-15"
}
```

#### List Item Endpoints

**POST `/api/lists`**

-   Create a list

Parameters:

```
{
    "listId": "<list id>",
    "item": "<list item>",
    "description": "<list item description>",
    "status": "<list item status>",
    "category": "<list item category>"
}
```

Response:

```
{
    "id": ""
    "listId": "",
    "items": "Toothbrush",
    "description": "Don't forget to charge your toothbrush!",
    "status": "In Progress",
    "category": "Toiletries"
}
```

**GET `/api/lists/:tripId`**

-   Retrieve all lists for a trip

Response:

```
[
    {
        "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "listName": "Packing",
        "item": "Toothbrush",
        "description": "Don't forget to charge your toothbrush!",
        "status": "In Progress",
        "category": "Toiletries"
    }
    {
        "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "listName": "Groceries",
        "item": "Toothbrush",
        "description": "Don't forget to charge your toothbrush!",
        "status": "In Progress",
        "category": "Toiletries"
    }
    {
        "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "listName": "Packing",
        "item": "Toothbrush",
        "description": "Don't forget to charge your toothbrush!",
        "status": "In Progress",
        "category": "Toiletries"
    }
]
```

**PUT `/api/lists/:listId`**

-   Update a lists details
-   No POST body expected

Response:

```
{
    "id": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14"
    "tripId": "091de676-61af-4ee6-90de-3a7a53af7521"
    "listName": "Adventure Time"
    "destination": "Candy Kingdom"
    "startDate": "2025-02-28"
    "endDate": "2025-03-15"
}
```

**DELETE `/api/lists/:listId`**

-   Delete a list

Response:

```
{
    "id": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14"
    "tripId": "091de676-61af-4ee6-90de-3a7a53af7521"
    "listName": "Adventure Time"
    "destination": "Multiverse"
    "startDate": "2025-03-01"
    "endDate": "2025-03-15"
}
```

## Roadmap

-   **Day 1: Backend Setup**
    -   [ ] Initialize the `Express` server
    -   [ ] Set up `MySQL` database connection
    -   [ ] Create database schema for key entities:
        -   Users
        -   Trips
        -   Itineraries
        -   Packing/Shared Lists
    -   [ ] Test database connection using dummy data
-   **Day 2: Backend Routes**
    -   [ ] Implement CRUD routes for Trips:
        -   Create a trip
        -   Retrieve trips by user
        -   Update trip details
        -   Delete a trip
    -   [ ] Test API routes using Postman or similar tools
-   **Day 3: Backend Routes Continued**
    -   [ ] Add CRUD routes for Itinerary Items:
        -   Create, read, update, delete itinerary events
    -   [ ] Add CRUD routes for Packing/Shared Lists:
        -   Create, read, update, delete list items
    -   [ ] Perform comprehensive endpoint testing
-   **Day 4: Frontend Setup**
    -   [ ] Initialize React app using `Vite` or `Create React App`.
    -   [ ] Set up routing with react-router-dom:
        -   Home
        -   Dashboard
        -   Trip Initialization
        -   Itinerary
        -   Lists
    -   Login/Registration (_basic structure only_)
-   **Day 5: Frontend Components**
    -   [ ] Create reusable components:
        -   Header, Footer, and Navigation Bar
        -   Cards for displaying trip summaries
    -   [ ] Build UI for Home Page and Dashboard:
        -   Include static content placeholders
-   **Day 6: Frontend Integration (Dashboard & Trips)**
    -   [ ] Connect the Dashboard to the backend:
        -   Fetch and display user trips
        -   Implement countdown to the first upcoming trip
    -   [ ] Add trip creation form, connecting it to the backend for saving new trips
-   **Day 7: Frontend Integration (Itinerary & Lists)**
    -   [ ] Build and integrate the Itinerary View:
        -   Use `react-big-calendar` or `FullCalendar`
        -   Populate calendar with sample data fetched from the backend.
    -   [ ] Develop the Packing/Shared List:
        -   Add form for managing items
        -   Implement backend CRUD functionality for lists
-   **Day 8: Testing and Polishing**
    -   [ ] Test all implemented functionality end-to-end
    -   [ ] Fix bugs or issues with routing, state, or backend logic
    -   [ ] Enhance UI consistency with basic Sass styling
-   **Day 9: Final Touches**
    -   [ ] Prepare a working demo with sample data for presentation
    -   [ ] Write a `README` file with setup instructions and functionality overview
-   **Day 10: Presentation Preparation**
    -   [ ] Verify data flow and ensure features are functional
    -   [ ] Create mock accounts and trips for a polished demo
    -   [ ] Practice showcasing the app with key features like trip creation, itinerary setup, and packing list management

---

## Future Implementations

-   Preset lists to use as a basepoint depending on the type of trip
-   Reminders
-   Sharing trips with other users
-   Shared expense tracking
-   Forward confirmation emails to automatically add to itinerary
-   Dashboard
    -   Upcoming tasks
    -   Progress indicators for lists
-   Map integration
    -   View all locations in itinerary on a map
    -   Filter by day, or by location
-   Brainstorming page
    -   Add text and links to collaboratively brainstorm itinerary details