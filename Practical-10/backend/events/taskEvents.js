const EventEmitter = require('events');

class TaskEvents extends EventEmitter {}

// Export single shared EventEmitter instance
module.exports = new TaskEvents();
