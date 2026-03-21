import useSWR from "swr";

async function fetchStatus(key) {
  const response = await fetch(key);
  const responseBody = await response.json(response);
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <h1>Database</h1>
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return <div>Carregando...</div>;
  }

  let UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return <div>Carregando informações do banco...</div>;
  }

  const database = data.dependencies.database;

  return (
    <div>
      <div>Versão do Postgres: {database.version}</div>
      <div>Quantidade de conexões abertas: {database.opened_connections}</div>
      <div>Quantidade de conexões máximas: {database.max_connections}</div>
    </div>
  );
}
