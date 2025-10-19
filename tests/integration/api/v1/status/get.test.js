test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // Testing Updated At
  const responseBody = await response.json(response);
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // Testing Postgres Version
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  // Testing Postgres Max Connections
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  
  // Testing Postgres Used Connections
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
