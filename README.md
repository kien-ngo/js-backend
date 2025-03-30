# The ~~JS~~ TypeScript Backend Framework
- Open-source
- Self-hostable
- Great performance thanks to Hono & Bun
- Type-safety

### Local development:  
- Have Docker or a similar app (like Orb.stack) up and running
- Boot up the Postgres & Redis server (from the `docker-compose.yml` file): `bun infra:start`
- Run the backend server: `bun dev`
- Access the API documentation _of the api server_ at [http://localhost:4000/docs](http://localhost:4000/docs)
- Access the API documentation _for Better-auth endpoints_ at [http://localhost:4000/api/auth/reference]()
- Access the OpenAPI specs at [http://localhost:4000/openapi.json](http://localhost:4000/openapi.json)


### Reasons for the choices of technologies:
- Not being locked-in to any database. Better-auth can work with many types of DB
- Not being locked-in to any closed-source services
- All solutions in this framework can be migrated to another similar solutions.

The app comes with Postgres by default. Better-auth interacts with it via the DATABASE_URL (connection string) so you can deploy this app to prod and connect it to any database service via said variable. To use MySQL, SQLite or any other SQL flavors, refer to Better-auth docs.

### ORMs
- For usage with Drizzle ORM, please refer to the [orm/drizzle](https://github.com/kien-ngo/js-backend/tree/orm/drizzle) branch.
- Prisma (coming soon)

### Deploying to clouds
- Railway: Refer to [RAILWAY.md](/deployments/RAILWAY.md)

Credits:  
- https://github.com/kadumedim/better-auth-starter
- https://github.com/daveyplate/better-auth-tanstack-starter

Others:  
- `@t3-oss/env-core` for managing env variables in a type-safe manner
- `zod` for runtime schema validation, feel free to replace it with something like Valibot
- If you are looking for a self-hostable web anlytics service that utilizes the existing Postgres/MySQL & Redis resources, [Umami](https://umami.is) is a great fit!
- [OpenObserve](https://openobserve.ai/) is a great selfhost service for observability.

### Credits:  
- https://github.com/kadumedim/better-auth-starter
- https://github.com/daveyplate/better-auth-tanstack-starter