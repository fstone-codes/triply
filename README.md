# Triply

## Overview

Triply is a streamlined, interactive app designed to simplify trip planning. It consolidates essential travel tasks into one platform, making travel preparation efficient, collaborative, and enjoyable.

### Problem Space

Planning a trip, especially for groups, involves juggling expenses, itineraries, packing lists, and preferences. Current tools are either too specialized or require heavy customization, forcing travelers to switch between apps.

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
-   Frequent + business travelers
    -   Save reusable itineraries, packing lists, and preferred destinations for future trips
    -   Quickly adapt old trip plans to new destinations or dates
    -   Access a history of past trips for reference and optimization
    -   Reuse or modify saved lists for frequent trips (e.g., business, family vacations)
-   Outdoor enthusiasts
    -   Plan hiking, camping, and adventure trips with specialized packing lists (e.g., gear, food, first aid)
    -   Coordinate meeting locations and transport logistics for group outdoor activities
    -   Track weather forecasts, outdoor activity options, and safety details
    -   Share event details and coordinate with other participants in real-time
    -   Integrating safety alerts or location-based details

### Features

-   User Setup
    -   The user can create an account to manage trip planning projects
    -   The user can login to their existing account to manage trip planning projects
-   Trip Planning
    -   The logged in user can see a summary of their trips on their dahsboard
    -   The logged in user can create a new trip, outlining the parameters of the trip
    -   The logged in user can manage trips with itineraries
    -   The logged in user can manage trips with lists
    -   The logged in user can manage trips with collaborative editing

## Implementation

### Tech Stack

-   React
-   MySQL
-   Express
-   Thunder Client
-   Essential:
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
-   Future:
    -   Client libraries:
        -   dotenv
    -   Server libraries:
        -   bcrypt
        -   jsonwebtoken

### APIs

-   No external APIs will be used for the first sprint

### Sitemap

-   Home page
-   Register
-   Login
-   User dashboard
-   New Trip Setup
-   Trip itinerary
-   Trip lists

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

#### Home Page

![](/src/assets/mockups/1.0-HOME.png)

#### Register Page

![](/src/assets/mockups/2.0-REGISTER.png)

#### Login Page

![](/src/assets/mockups/3.0-LOGIN.png)

#### Dashboard Page

![](/src/assets/mockups/4.0-DASHBOARD.png)

#### New Trip Page

![](/src/assets/mockups/5.0-NEW-TRIP.png)

#### Itinerary Page

![](/src/assets/mockups/6.0-ITINERARY.png)

#### Checklist Page

![](/src/assets/mockups/7.0-CHECKLIST.png)

### Data

![](/src/assets/mockups/sql-diagram.png)

### Endpoints

#### API Errors

-   This API may return a 400 or 404 Errors

Response:

```
{
    "error": "User not found"
}
```

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

**PATCH `/api/trips/:tripId`**

-   Update a trips details
-   Only the specified fields will be updated

Parameters:

```
{
    "destination": "Candy Kingdom"
}
```

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

#### Itinerary Endpoints

**POST `/api/itineraries`**

-   Create an itinerary item

Parameters:

```
{
    "tripId": "<trip id>",
    "title": "<itinerary title>",
    "description": "<itinerary description>",
    "date": "<itinerary date>",
    "startTime": "<itinerary start time>",
    "endTime": "<itinerary end time>"
}
```

Response:

```
{
    "id": "e3c84a5d-cd5e-4e6a-841d-557fef774f6b",
    "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "title": "Day Trip to Pillow World",
    "description": "Exploring the depths of the Multiverse",
    "date": "2025-03-05",
    "startTime": "08:00:00",
    "endTime": "20:00:00"
}
```

**GET `/api/itineraries/:tripId`**

-   Retrieve all itinerary items for a trip

Response:

```
[
    {
        "id": "e3c84a5d-cd5e-4e6a-841d-557fef774f6b",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "title": "Day Trip to Pillow World",
        "description": "Exploring the depths of the Multiverse",
        "date": "2025-03-05",
        "startTime": "08:00:00",
        "endTime": "20:00:00"
    }
    {
        "id": "f32751ae-29f2-44f9-89f1-71088ab24bbf",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "title": "Day Trip to Baby World",
        "description": "",
        "date": "2025-03-07",
        "startTime": "09:00:00",
        "endTime": "18:00:00"
    }
]
```

**PATCH `/api/itineraries/:itineraryId`**

-   Update an itinerary item details
-   No POST body expected

Response:

```
{
    "id": "e3c84a5d-cd5e-4e6a-841d-557fef774f6b",
    "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "title": "Day Trip to Pillow World",
    "description": "Exploring the depths of the Multiverse",
    "date": "2025-03-03",
    "startTime": "07:30:00",
    "endTime": "18:00:00"
}
```

**DELETE `/api/itineraries/:itineraryId`**

-   Delete an itinerary item

Response:

```
{
    "id": "e3c84a5d-cd5e-4e6a-841d-557fef774f6b",
    "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "title": "Day Trip to Pillow World",
    "description": "Exploring the depths of the Multiverse",
    "date": "2025-03-05",
    "startTime": "08:00:00",
    "endTime": "20:00:00"
}
```

#### List Endpoints

**POST `/api/lists`**

-   Create a list

Parameters:

```
{
    "tripId": "<trip id>",
    "listName": "<list name>"
}
```

Response:

```
{
    "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
    "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "listName": "Packing"
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
    }
    {
        "id": "73fbece1-1d74-4428-8043-99814f4cfb1d",
        "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "listName": "Groceries",
    }
]
```

**PATCH `/api/lists/:listId`**

-   Update a lists details
-   No POST body expected

Response:

```
{
    "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
    "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "listName": "Stuff I Need",
}
```

**DELETE `/api/lists/:listId`**

-   Delete a list

Response:

```
{
    "id": "968f0fd7-8e28-4091-93ad-537d5e36ec17",
    "tripId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "listName": "Packing",
}
```

#### List Item Endpoints

**POST `/api/lists/:listId/items`**

-   Create a list item

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
    "id": "e0eea5f0-0f8c-4b54-9fc4-ff50843766d4",
    "listId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "item": "Toothbrush",
    "description": "Don't forget to charge your toothbrush!",
    "status": 1,
    "category": "Toiletries"
}
```

**GET `/api/lists/:listId/items`**

-   Retrieve all list items for a list

Response:

```
[
    {
        "id": "e0eea5f0-0f8c-4b54-9fc4-ff50843766d4",
        "listId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "item": "Toothbrush",
        "description": "Don't forget to charge your toothbrush!",
        "status": 1,
        "category": "Toiletries"
    },
    {
        "id": "i0e5a5f0-7kjc-2r45-5h7k-gt52183254k0",
        "listId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
        "item": "Floss",
        "description": "",
        "status": 2,
        "category": "Toiletries"
    }
]
```

**PATCH `/api/lists/:listId/items/:itemId`**

-   Update a list items details
-   No POST body expected

Response:

```
{
    "id": "e0eea5f0-0f8c-4b54-9fc4-ff50843766d4",
    "listId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "item": "Toothbrush",
    "description": "Don't forget to charge your toothbrush!",
    "status": 2,
    "category": "Toiletries"
}
```

**DELETE `/api/lists/:listId/items/:itemId`**

-   Delete a list item

Response:

```
{
    "id": "e0eea5f0-0f8c-4b54-9fc4-ff50843766d4",
    "listId": "b79a3c07-8682-4ab6-aff2-92ebb4bbfc14",
    "item": "Toothbrush",
    "description": "Don't forget to charge your toothbrush!",
    "status": 2,
    "category": "Toiletries"
}
```

## Roadmap

-   **Nov 19: Backend Setup**
    -   [x] Initialize React app using `Vite`
    -   [x] Initialize the `Express` server
    -   [x] Set up `MySQL` database connection
    -   [x] Create database schema for key entities:
        -   Users
        -   Trips
        -   Itineraries
        -   Lists
    -   [x] Test database connection using dummy data
-   **Nov 20: Backend Routes**
    -   [x] Implement CRUD routes for Trips:
        -   Create a trip
        -   Retrieve trips by user
        -   Update trip details
        -   Delete a trip
    -   [x] Add CRUD routes for Itinerary Items:
        -   Create, read, update, delete itinerary events
    -   [x] Test API routes using Postman or similar tools
-   **Nov 21: No Work**
    Hackathon
    -   [x] Ask for help validating patch for trips route
-   **Nov 22: Backend Routes Continued**
    -   [x] Add CRUD routes for Lists:
        -   Create, read, update, delete lists
    -   [x] Add CRUD routes for List Items:
        -   Create, read, update, delete list items
    -   [x] Refactor update endpoints to PUT
-   **Nov 23: Frontend Setup**
    -   [x] Set up routing with react-router-dom:
        -   Home
        -   Dashboard
        -   Trip Initialization
        -   Itinerary
        -   Lists
    -   [x] Create reusable components:
        -   Header, Footer, and Navigation Bar
        -   Cards for displaying trip summaries
    -   [x] Build UI for Home Page
-   **Nov 24: Frontend Integration (Itinerary & Lists)**
    -   [x] Build and integrate the Itinerary View:
        -   Use `react-big-calendar`
        -   Populate calendar with sample data fetched from the backend.
    -   [x] Develop the List + List Items:
        -   Implement backend CRUD functionality for lists
-   **Nov 25: Frontend Integration**
    -   [x] Trips
        -   Add form for creating/editing trips
            -   Route completed form to itinerary
    -   [x] Create navigation component
-   **Nov 26: Frontend Components**
    -   [x] Itineraries
        -   Add form for creating itineraries
            -   Route completed form to itinerary
    -   [x] Lists
        -   Add form for creating/editing lists
            -   Route completed form to list
        -   Add form for creating/editing items
            -   Route completed form to list
-   **Nov 27: Buffer Day**
    Add any incomplete work below and use this day to complete loose ends:
    -   [x] Change avatar
    -   [x] Create and style trip details page
    -   [x] Style list of lists page
    -   [x] Edit `ListItemFormInput` to change the form inputs on the edit page (_e.g. drop down menu for categories_)
    -   [ ] \*\*\*Ask for help
        -   Edit `ListEditModal` style + organization for easier readability
    -   [ ] Login/Registration (_basic structure only_)
    -   [ ] Build UI for Dashboard:
        -   Include static content placeholders
    -   [ ] Connect the Dashboard to the backend:
        -   Fetch and display user trips
    -   [ ] Style calendar simply
    -   [ ] Create responsive design on all pages
    -   [ ] Add animations / transitions wher necessary
    -   [ ] Add error message to forms
    -   [ ] Perform comprehensive endpoint testing
    -   [ ] Clean up backend files (check in chatGPT)
        -   Use day.js to validate dates/times (implemented for itineraries controller already)
    -   [ ] Add form for editing itineraries
-   **Nov 28: Testing and Polishing**
    -   [ ] Test all implemented functionality end-to-end
    -   [ ] Fix bugs or issues with routing, state, or backend logic
    -   [ ] Enhance UI consistency with basic Sass styling
    -   [ ] Clean up
        -   Remove unnecessary comments
        -   Remove unused imports
        -   Remove unused pages / components / files
        -   \*\*\*Look for `data down` opportunities and refactor
        -   Rename classes/components/etc. for consistency
        -   Organize backend
        -   Add useful comments to front + backend
-   **Nov 29: Final Touches**
    -   [ ] Prepare a working demo with sample data for presentation
    -   [ ] Update frontend `README` file with actual data diagram and endpoints
    -   [ ] Write a `README` file with setup instructions and functionality overview
-   **Nov 30: Presentation Preparation**
    -   [ ] Verify data flow and ensure features are functional
    -   [ ] Create mock accounts and trips for a polished demo
    -   [ ] Practice showcasing the app with key features like trip creation, itinerary setup, and packing list management

---

## Future Implementations

-   User authentication / authorization
-   Utility Features: Preset lists, reminders, sharing trips
-   Expense Tracking: Expense splitting and payment reminders
-   Collaboration: Shared brainstorming and itinerary adjustments
-   Dashboard Insights: Task progress, upcoming reminders
-   Integration with email parsing to auto-add itinerary items from booking confirmations
-   Geocoding API integration:
    -   Validate user-provided destinations (city, country, or specific location)
    -   Offer auto-complete suggestions while typing to reduce errors.
    -   Interactive map views:
        -   Display all itinerary locations on an interactive map for better visualization
        -   Highlight key points (e.g., lodging, activity spots) with color-coded markers
    -   Filtering options:
        -   Filter map locations by specific days or activity categories (e.g., restaurants, landmarks)
        -   Group nearby locations for convenience during daily planning
-   Security Features: Include secure handling of user data with hashing (bcrypt) and authentication (JWT)
