const { spawn } = require("child_process");

const run = (cmd, args, opts = {}) =>
  spawn(cmd, args, { stdio: "inherit", shell: true, ...opts });

const servicesUp = () => run("npm", ["run", "services:up"]);
const servicesWait = () => run("npm", ["run", "services:wait:database"]);
const migrationsUp = () => run("npm", ["run", "migrations:up"]);
const nextDev = () => run("npx", ["next", "dev"]);

let child;

async function start() {
  servicesUp().on("exit", code => {
    if (code !== 0) process.exit(code);

    servicesWait().on("exit", code => {
      if (code !== 0) process.exit(code);

      migrationsUp().on("exit", code => {
        if (code !== 0) process.exit(code);

        child = nextDev();
      });
    });
  });
}

function cleanupAndExit(code = 0) {
  run("npm", ["run", "services:stop"]).on("exit", () => process.exit(code));
}

["SIGINT", "SIGTERM", "SIGQUIT", "SIGHUP", "exit"].forEach(sig => {
  process.on(sig, () => cleanupAndExit(0));
});


start();
