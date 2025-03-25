Local development:  
- Have Docker or Orb.stack up and running
- Boot up the Postgres & Redis server (from the `docker-compose.yml` file): `bun infra:start`
- Run the backend server: `bun dev`
- Access the API documentation at [http://localhost:4000/docs](http://localhost:4000/docs)
- Access the OpenAPI specs at [http://localhost:4000/openapi](http://localhost:4000/openapi)

Database flow:  
- When the auth schema changes: `bun auth:generate`
- Then, include the change in the grand schema for Drizzle: `bun db:migrate`
- Finally, run the migration: `bun db:migrate`

Reasons for the choice of technologies:
- Not being locked-in to any database. Better-auth & Drizzle ORM can work with many types of DB
- Not being locked-in to any closed-source services
- All solutions in this framework can be migrated to another similar solutions.

Credits:  
- https://github.com/kadumedim/better-auth-starter
- https://github.com/daveyplate/better-auth-tanstack-starter