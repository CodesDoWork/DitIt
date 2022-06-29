# TodoApp

---

## Start the application

### Local dev
1. `npm i`
2. `npm run dev`

### Local production
1. `npm i`
2. Change to baseUrl in [environment.prod.ts](./apps/frontend/src/environments/environment.prod.ts)
   to the url where the backend will be hosted. (default is already set)
3. `npm run build:prod`
4. `npm start`

### From docker
1. Change to baseUrl in [environment.prod.ts](./apps/frontend/src/environments/environment.prod.ts)
   to the url where the backend will be hosted. (default is already set)
2. `npm run docker:build` -> docker container
3. In case you want to run it locally, use `npm run docker:run`

### Customization

#### Local
- set the backend port with environment variable `PORT`
- don't forget to change the baseUrl in [environments](./apps/frontend/src/environments)

#### Docker
You can simply change the port mapping of the `docker:run` script.
If you want to change the ports inside the container, use the following steps:
- Set the backend port of the production stage with `ENV PORT {port_here}` inside the Dockerfile
- Set the frontend port within the [start.sh](./start.sh) file with `-l {port_here}`
  Don't forget to `EXPOSE` this port in production stage of the Dockerfile
  and update in inside the `docker:run` command.
- build a new container

## Architecture
This repository contains two apps (backend & frontend) and a shared-library (types).

NestJS is used for the backend and React for the frontend.
A Swagger documentation of the API endpoints and data-types can be found at
`{baseUrl}:{port}/api` (default: [localhost:3333/api](http://localhost:3333/api)).

## Usage (Frontend)
 
### TodoList Page
On a todolist-page you can double-click the name (headline) and edit it.
Todo items drag-n-droppable. 
