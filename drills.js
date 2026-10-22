
import { orders } from "./data.js";

const ORIGINAL = JSON.stringify(orders);

// Station 1 — Warm-up

// Question 1: Array of all order IDs
const orderIds = orders.map(({ id }) => id);

console.log("Question 1:", orderIds);

console.log(
  "Original data unchanged:",
  JSON.stringify(orders) === ORIGINAL
);

 // Question 2: Array of customer names (duplicates allowed)
const customerNames = orders.map(
  ({ customer: { name } }) => name
);

console.log("Question 2:", customerNames);



 // Question 3: All delivered orders
const deliveredOrders = orders.filter(
  ({ status }) => status === "delivered"
);

console.log("Question 3:", deliveredOrders);
