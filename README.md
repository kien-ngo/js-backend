Local development:  
- Have Docker or a similar app (like Orb.stack) up and running
- Boot up the Postgres & Redis server (from the `docker-compose.yml` file): `bun infra:start`
- Run the backend server: `bun dev`
- Access the API documentation at [http://localhost:4000/docs](http://localhost:4000/docs)
- Access the OpenAPI specs at [http://localhost:4000/openapi](http://localhost:4000/openapi)

Making changes to the database:  
- When the auth schema changes: `bun auth:generate`
- Then, include the change in the grand schema for Drizzle: `bun db:migrate`
- Finally, run the migration: `bun db:migrate`

Reasons for the choice of technologies:
- Not being locked-in to any database. Better-auth & Drizzle ORM can work with many types of DB
- Not being locked-in to any closed-source services
- All solutions in this framework can be migrated to another similar solutions.

The app comes with Postgres by default. Better-auth & Drizzle interact with it via the DATABASE_URL (connection string) so you can deploy this app to prod and connect it to any database service via said variable. To use MySQL, SQLite or any other SQL flavors, refer to Better-auth and Drizzle docs.

Credits:  
- https://github.com/kadumedim/better-auth-starter
- https://github.com/daveyplate/better-auth-tanstack-starter

Others:  
- `@t3-oss/env-core` for managing env variables in a type-safe manner
- `zod` for runtime schema validation, feel free to replace it with something like Valibot
- If you are looking for a self-hostable web anlytics service that utilizes the existing Postgres/MySQL & Redis resources, [Umami](https://umami.is) is a great fit!
- [OpenObserve](https://openobserve.ai/) is a great selfhost service for observability.