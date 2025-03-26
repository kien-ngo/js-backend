# Deploying to Fly.io

This guide outlines how to deploy this backend application to Fly.io.

## Prerequisites

1. [Install Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/)
2. Sign up and log in to Fly.io
   ```bash
   fly auth login
   ```

## Deployment Steps

### 1. Initialize Fly.io App (First Time Only)

```bash
fly launch
```

When prompted:
- Choose "No" for existing configuration
- Name your app (or use the default)
- Choose your preferred region
- Skip PostgreSQL and Redis setup (we'll provision them separately)

### 2. Provision PostgreSQL

```bash
fly postgres create --name auth-db
```

Connect your app to the Postgres instance:

```bash
fly postgres attach --app auth-server --postgres-app auth-db
```

### 3. Provision Redis

```bash
fly redis create --name auth-redis
```

Connect your app to the Redis instance:

```bash
fly redis attach --app auth-server --redis-app auth-redis
```

### 4. Set Environment Variables

```bash
fly secrets set BETTER_AUTH_SECRET=your_secret_here
```

### 5. Deploy Your Application

```bash
fly deploy
```

### 6. Run Migrations (After First Deployment)

```bash
fly ssh console -C "bun run db:migrate"
```

## Monitoring and Management

- View logs:
  ```bash
  fly logs
  ```

- Access shell:
  ```bash
  fly ssh console
  ```

- Scale app:
  ```bash
  fly scale count 2  # Change to desired number of instances
  ```

## Updating Your Application

To update your application after making changes:

```bash
fly deploy
```

## Troubleshooting

- If the deployment fails, check the logs:
  ```bash
  fly logs
  ```

- For networking issues:
  ```bash
  fly status
  ```

- To check resource usage:
  ```bash
  fly status -a auth-server
  ```