class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(task) {
    this.queue.push(task);
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const currentTask = this.queue.shift();
      await currentTask();
    }

    this.isProcessing = false;
  }
}

const q = new AsyncQueue();

function logQueue() {
  console.log("Queue pending process:", q.queue.length);
}

const fetchFoo = async () => {
  console.log("> Fetching Foo...");
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  console.log("> Foo fetched.");
  logQueue();
};

const fetchBar = async () => {
  console.log("<< Fetching Bar...");
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  console.log("<< Bar fetched.");
  logQueue();
};

// represents a repeating task
setInterval(() => {
  q.enqueue(fetchFoo);
}, 3000);

// represents a user action
setInterval(() => {
  q.enqueue(fetchBar);
}, 6000);
