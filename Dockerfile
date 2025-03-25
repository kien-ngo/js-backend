FROM oven/bun:1.0 as base

WORKDIR /app

# Copy package.json and lock files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Copy env.example to .env if no .env exists
RUN if [ ! -f .env ]; then cp env.example .env; fi

# Generate database migrations
RUN bun run db:migrate

# Expose the application port (adjust as needed)
EXPOSE 3000

# Run the application
CMD ["bun", "run", "dev"]