# Triply - Frontend

## Setup

1. Ensure the backend `triply-api` is setup and running
2. Clone the repository: `git clone <frontend-repo-link>`
3. Navigate to the project directory: `cd triply`
4. Install dependencies: `npm install`
5. Duplicate the `.env.sample` file and edit the file name to be `.env`
6. Edit the environment variable in `.env` accordingly:
    1. `VITE_API_URL=http://localhost:8080`
        - This corresponds to the backend's `PORT` environmental variable
        - Ensure no spaces
7. Start the server: `npm run dev`

**NOTE: Mobile design only, responsive designs to be implemented in following sprints**
