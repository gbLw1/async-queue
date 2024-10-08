# Async queue

## Description

This is a simple async queue implementation in JavaScript.

## Motivation

I needed a simple async queue implementation for a project I was working on so I decided to write one.

The trouble I was having was that I needed to be able to process some request (button click by the user) while others were still running in the background in a loop without blocking each other, so I wrote this async queue to handle the requests with priority (FIFO).

## Usage

Use the `logQueue` function to log the queue state.

```javascript
const q = new AsyncQueue();

q.enqueue(async () => {
  console.log("Task 1");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  logQueue();
});

q.enqueue(async () => {
  console.log("Task 2");
  await new Promise((resolve) => setTimeout(resolve, 500));
  logQueue();
});

q.enqueue(async () => {
  console.log("Task 3");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  logQueue();
});
```
