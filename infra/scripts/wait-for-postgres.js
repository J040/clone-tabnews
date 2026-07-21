const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    'docker exec postgres-dev sh -c \'pg_isready --host localhost --username "$POSTGRES_USER" --dbname "$POSTGRES_DB"\'',
    handleReturn,
  );

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      // console.log(".");
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}

// console.log("🔴 Aguardando Postgres aceitar conexões");
process.stdout.write("\n🔴 Aguardando Postgres aceitar conexões\n");
checkPostgres();
