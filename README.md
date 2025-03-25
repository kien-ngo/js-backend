Local development:  
- Have Docker or Orb.stack up and running
- Boot up the Postgres & Redis server (from the `docker-compose.yml` file): `bun infra:start`

Database flow:  
- When the auth schema changes: `bun auth:generate`
- Then, include the change in the grand schema for Drizzle: `bun db:migrate`
- Finally, run the migration: `bun db:migrate`

Credits:  
- https://github.com/kadumedim/better-auth-starter
- https://github.com/daveyplate/better-auth-tanstack-starter