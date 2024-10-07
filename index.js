let requestInProgress = false;
/**
 * @type {Array<() => Promise<void>}
 */
const requestQueue = [];

function fooRequest() {
  enqueueRequest(async () => {
    if (requestInProgress) {
      console.log("=== Request canceled ===");
      return;
    }

    requestInProgress = true;

    new Promise((resolve) => {
      console.log("> foo started");
      setTimeout(() => {
        console.log("< foo finished\n");
        resolve();
      }, 1000);
    }).finally(() => {
      requestInProgress = false;
      executeNextRequest();
    });
  });
}

function barRequest() {
  enqueueRequest(async () => {
    if (requestInProgress) {
      console.log("=== Request canceled ===");
      return;
    }

    requestInProgress = true;

    new Promise((resolve) => {
      console.log(">> bar started");
      setTimeout(() => {
        console.log("<< bar finished\n");
        resolve();
      }, 2000);
    }).finally(() => {
      requestInProgress = false;
      executeNextRequest();
    });
  });
}

function executeNextRequest() {
  if (requestQueue.length > 0) {
    const nextRequest = requestQueue.shift();
    nextRequest && nextRequest();
  }
}

function enqueueRequest(requestFunc) {
  if (requestInProgress) {
    requestQueue.push(requestFunc);
  } else {
    requestFunc();
  }
}

function main() {
  setInterval(() => {
    enqueueRequest(() => fooRequest());
  }, 1000);

  setInterval(() => {
    enqueueRequest(() => barRequest());
  }, 5000);

  console.log("Started");
  console.log("Press Ctrl+C to stop");
}

main();
