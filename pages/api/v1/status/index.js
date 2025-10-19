import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const selectVersion = await database.query('SHOW server_version;');
  const postgresVersion = selectVersion.rows[0].server_version;
  
  const selectConnections = await database.query('SHOW max_connections;');
  const maxConnections = selectConnections.rows[0].max_connections;
  
  const databaseName = process.env.POSTGRES_DB;
  const selectActiveConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });
  const openedConnections = selectActiveConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections,
      }
    }
  });
}

export default status;