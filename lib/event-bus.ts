import { EventEmitter } from "events";

// Module-level singleton — shared across all requests in a single Node.js process.
// Works in dev mode and with `next start`. Not compatible with Vercel serverless functions.
const bus = new EventEmitter();
bus.setMaxListeners(500);

export default bus;
