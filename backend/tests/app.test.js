const request = require("supertest");
const app = require("../app");

describe("Backend API", () => {
  test("GET /health returns healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
    expect(response.body.service).toBe("todo-backend");
  });

  test("GET /api/todos returns a list of todo items", async () => {
    const response = await request(app).get("/api/todos");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("task");
  });
});