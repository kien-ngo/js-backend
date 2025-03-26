import { Hono } from "hono";
import { auth } from "./lib/auth";
import { logger } from "hono/logger";
import { apiReference } from "@scalar/hono-api-reference";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { envs } from "./lib/envs";
const app = new Hono();

app.use(logger());

/**
 * Reserve this path for the docs UI
 * using Scalar
 */
app.get(
	"/docs",
	apiReference({
		// Change the theme here to your linking
		theme: "saturn",
		url: "/openapi.json",
	}),
);

/**
 * The generated openapi.json which will be used by Scalar
 */
app.get(
	"/openapi.json",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Hono API Documentation",
				version: "1.0.0",
				description: "RESTful API built with Hono and documented with OpenAPI",
				contact: {
					name: "API Support",
					email: "support@example.com",
				},
				license: {
					name: "MIT",
					url: "https://opensource.org/licenses/MIT",
				},
			},
			servers: [
				{
					url: envs.BETTER_AUTH_URL,
					description: "Local Development Server",
				},
				{
					url: "https://api.example.com",
					description: "Production Server",
				},
			],
			tags: [
				{ name: "Basic", description: "Basic endpoints" },
				{ name: "System", description: "System monitoring endpoints" },
				{ name: "Test", description: "Test endpoints" },
				{ name: "Users", description: "User management endpoints" },
				{ name: "Products", description: "Product management endpoints" },
				{ name: "Orders", description: "Order management endpoints" },
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
		},
	}),
);

app.get(
	"/",
	describeRoute({
		description: "Root endpoint",
		summary: "Returns a welcome message",
		tags: ["Basic"],
		responses: {
			200: {
				description: "Welcome message",
				content: {
					"text/plain": {
						schema: {
							type: "string",
						},
					},
				},
			},
		},
	}),
	(c) => {
		return c.text("Hello Hono!");
	},
);

app.get(
	"/health",
	describeRoute({
		description: "Health check endpoint",
		summary: "Returns the current status of the API",
		tags: ["System"],
		responses: {
			200: {
				description: "System is healthy",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								status: {
									type: "string",
									example: "ok",
								},
								timestamp: {
									type: "string",
									format: "date-time",
									example: "2023-01-01T00:00:00.000Z",
								},
							},
						},
					},
				},
			},
		},
	}),
	(c) => {
		return c.json({
			status: "ok",
			timestamp: new Date().toISOString(),
		});
	},
);

app.get(
	"/test",
	describeRoute({
		description: "Say hello to the user",
		summary: "Test endpoint",
		tags: ["Test"],
		responses: {
			200: {
				description: "Successful response",
				content: {
					"text/plain": {
						schema: {
							type: "string",
						},
					},
				},
			},
		},
	}),
	(c) => {
		return c.text("Hello Hono!");
	},
);

// Example with path parameters
app.get(
	"/users/:id",
	describeRoute({
		description: "Get user by ID",
		summary: "Retrieves a user by their unique identifier",
		tags: ["Users"],
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				schema: {
					type: "string",
				},
				description: "User's unique identifier",
			},
		],
		responses: {
			200: {
				description: "User found",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								id: {
									type: "string",
									example: "123",
								},
								name: {
									type: "string",
									example: "John Doe",
								},
								email: {
									type: "string",
									format: "email",
									example: "john@example.com",
								},
							},
						},
					},
				},
			},
			404: {
				description: "User not found",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								error: {
									type: "string",
									example: "User not found",
								},
							},
						},
					},
				},
			},
		},
	}),
	(c) => {
		const id = c.req.param("id");
		// This is just a mock implementation
		return c.json({
			id,
			name: "John Doe",
			email: "john@example.com",
		});
	},
);

// Example with query parameters
app.get(
	"/products",
	describeRoute({
		description: "List products with optional filtering",
		summary: "Get a list of products",
		tags: ["Products"],
		parameters: [
			{
				name: "category",
				in: "query",
				required: false,
				schema: {
					type: "string",
				},
				description: "Filter products by category",
			},
			{
				name: "limit",
				in: "query",
				required: false,
				schema: {
					type: "integer",
					default: 10,
					minimum: 1,
					maximum: 100,
				},
				description: "Maximum number of products to return",
			},
		],
		responses: {
			200: {
				description: "List of products",
				content: {
					"application/json": {
						schema: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: {
										type: "string",
										example: "prod-123",
									},
									name: {
										type: "string",
										example: "Smartphone",
									},
									price: {
										type: "number",
										format: "float",
										example: 599.99,
									},
									category: {
										type: "string",
										example: "Electronics",
									},
								},
							},
						},
					},
				},
			},
		},
	}),
	(c) => {
		const category = c.req.query("category");
		const limit = Number.parseInt(c.req.query("limit") || "10", 10);

		// This is just a mock implementation
		return c.json(
			[
				{
					id: "prod-123",
					name: "Smartphone",
					price: 599.99,
					category: "Electronics",
				},
				{
					id: "prod-456",
					name: "Laptop",
					price: 1299.99,
					category: "Electronics",
				},
			].slice(0, limit),
		);
	},
);

// Example with POST and request body
app.post(
	"/orders",
	describeRoute({
		description: "Create a new order",
		summary: "Submit a new order with items",
		tags: ["Orders"],
		requestBody: {
			required: true,
			content: {
				"application/json": {
					schema: {
						type: "object",
						required: ["items"],
						properties: {
							customerId: {
								type: "string",
								example: "cust-123",
							},
							items: {
								type: "array",
								items: {
									type: "object",
									required: ["productId", "quantity"],
									properties: {
										productId: {
											type: "string",
											example: "prod-123",
										},
										quantity: {
											type: "integer",
											minimum: 1,
											example: 2,
										},
									},
								},
							},
							shippingAddress: {
								type: "object",
								properties: {
									street: {
										type: "string",
										example: "123 Main St",
									},
									city: {
										type: "string",
										example: "Anytown",
									},
									zipCode: {
										type: "string",
										example: "12345",
									},
								},
							},
						},
					},
				},
			},
		},
		responses: {
			201: {
				description: "Order created successfully",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								orderId: {
									type: "string",
									example: "order-123",
								},
								createdAt: {
									type: "string",
									format: "date-time",
									example: "2023-01-01T00:00:00.000Z",
								},
								status: {
									type: "string",
									example: "pending",
								},
							},
						},
					},
				},
			},
			400: {
				description: "Invalid request",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								error: {
									type: "string",
									example: "Invalid request data",
								},
								details: {
									type: "array",
									items: {
										type: "string",
									},
									example: ["Items array cannot be empty"],
								},
							},
						},
					},
				},
			},
		},
	}),
	async (c) => {
		try {
			const body = await c.req.json();

			// Mock implementation
			return c.json(
				{
					orderId: `order-${Math.floor(Math.random() * 1000)}`,
					createdAt: new Date().toISOString(),
					status: "pending",
				},
				201,
			);
		} catch (error) {
			return c.json(
				{
					error: "Invalid request data",
					details: ["Failed to parse request body"],
				},
				400,
			);
		}
	},
);

// Example with JWT Authentication
app.get(
	"/profile",
	describeRoute({
		description: "Get the current user's profile",
		summary: "Retrieves authenticated user profile information",
		tags: ["Users"],
		security: [{ bearerAuth: [] }],
		responses: {
			200: {
				description: "User profile retrieved successfully",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								id: {
									type: "string",
									example: "user-123",
								},
								name: {
									type: "string",
									example: "John Doe",
								},
								email: {
									type: "string",
									format: "email",
									example: "john@example.com",
								},
								role: {
									type: "string",
									enum: ["user", "admin"],
									example: "user",
								},
								createdAt: {
									type: "string",
									format: "date-time",
									example: "2023-01-01T00:00:00.000Z",
								},
							},
						},
					},
				},
			},
			401: {
				description: "Unauthorized - Missing or invalid authentication token",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								error: {
									type: "string",
									example: "Unauthorized",
								},
							},
						},
					},
				},
			},
			403: {
				description: "Forbidden - User doesn't have access to this resource",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								error: {
									type: "string",
									example: "Forbidden",
								},
							},
						},
					},
				},
			},
		},
	}),
	(c) => {
		// Mock implementation - in a real app, you would verify the JWT here
		const authHeader = c.req.header("Authorization");

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		// Mock user data that would normally come from validating the JWT
		return c.json({
			id: "user-123",
			name: "John Doe",
			email: "john@example.com",
			role: "user",
			createdAt: "2023-01-01T00:00:00.000Z",
		});
	},
);

/**
 * Better Auth routes, see docs before changing
 * @link https://better-auth.com/docs
 */
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default {
	// Use environment PORT variable or default to 4000
	// For Fly.io deployment, PORT will be set to 8080
	port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
	fetch: app.fetch,
};
