import retry from "async-retry"

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    // Retry has a max number of attempts equals "5"
    // We can increase that to "100"
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage(bail, tryNumber) {
      const response = await fetch("http://localhost:3000/api/v1/status");
      
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

export default {
  waitForAllServices,
}