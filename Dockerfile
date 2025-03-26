FROM oven/bun:latest as builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:latest

WORKDIR /app

COPY --from=builder /app/server /app/server
COPY package.json ./
COPY migrations ./migrations
COPY src/database ./src/database
COPY drizzle.config.ts ./

RUN chmod +x /app/server

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["/app/server"]