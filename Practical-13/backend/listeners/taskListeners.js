const taskEvents = require('../events/taskEvents');

// 1. Task Created Listener (with simulated async background delay)
taskEvents.on('task-created', (data) => {
  const triggerTime = new Date().toISOString();
  console.log(`[Event Triggered] "task-created" received at ${triggerTime} for task: "${data.task.title}"`);

  // Simulate an asynchronous background notification/email task with setTimeout
  setTimeout(() => {
    const completionTime = new Date().toISOString();
    console.log(
      `[Background Notification] Task "${data.task.title}" notification processed successfully at ${completionTime} (User: ${data.user?.email || 'System'})`
    );
  }, 1500);
});

// 2. Task Deleted Listener (Supplementary Problem)
taskEvents.on('task-deleted', (data) => {
  const triggerTime = new Date().toISOString();
  console.log(`[Event Triggered] "task-deleted" received at ${triggerTime} for task: "${data.task.title}"`);

  // Asynchronous cleanup / audit log
  setImmediate(() => {
    console.log(
      `[Audit Log] Task ID "${data.task._id}" ("${data.task.title}") was purged by ${data.user?.email || 'Anonymous'} at ${new Date().toISOString()}`
    );
  });
});

// 3. Global Error Listener on EventEmitter (Supplementary Problem)
// Prevents unhandled error events from crashing the Node.js process
taskEvents.on('error', (err) => {
  console.error(`[Event Error Caught] An error occurred in TaskEvents pipeline: ${err.message}`);
});

console.log('[TaskListeners] Event listeners initialized and registered.');
