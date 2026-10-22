
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



 // Question 4: All orders from Gasabo
const gasaboOrders = orders.filter(
  ({ customer: { district } }) => district === "Gasabo"
);

console.log("Question 4:", gasaboOrders);



 // Question 5: The order with id 106
const order106 = orders.find(({ id }) => id === 106);

console.log("Question 5:", order106);



 // Question 6: Does any order have a rating of 3 or lower?
const hasLowRating = orders.some(
  ({ rating }) => rating !== null && rating <= 3
);

console.log("Question 6:", hasLowRating);



 // Question 7: Do all orders have a customer name?
const allHaveNames = orders.every(
  ({ customer: { name } }) => name !== ""
);
console.log("Question 7:", allHaveNames);



 // Question 8: Does the array of order IDs include 105?
const includesOrder105 = orderIds.includes(105);
console.log("Question 8:", includesOrder105);


// Station 2 — Calculations with reduce

 // Question 9: Total quantity of items across all orders
const totalItemsSold = orders.reduce(
  (total, { items }) => {
    return total + items.reduce(
      (itemTotal, { qty }) => itemTotal + qty,
      0
    );
  },
  0
);

console.log("Question 9:", totalItemsSold);



 // Question 10: Calculate total revenue from all orders
const totalRevenue = orders.reduce(
  (total, { items }) => {
    const orderTotal = items.reduce(
      (sum, { price, qty }) => sum + price * qty,
      0
    );

    return total + orderTotal;
  },
  0
);

console.log("Question 10:", totalRevenue);



 // Question 11: Find the most expensive order
const mostExpensiveOrder = orders.reduce(
  (highest, current) => {
    const highestTotal = highest.items.reduce(
      (sum, { price, qty }) => sum + price * qty,
      0
    );

    const currentTotal = current.items.reduce(
      (sum, { price, qty }) => sum + price * qty,
      0
    );

    return currentTotal > highestTotal ? current : highest;
  }
);

console.log("Question 11:", mostExpensiveOrder.id);



 // Question 12: Calculate the average rating
const ratedOrders = orders.filter(
  ({ rating }) => rating !== null
);

const totalRating = ratedOrders.reduce(
  (total, { rating }) => total + rating,
  0
);

const averageRating = totalRating / ratedOrders.length;

console.log("Question 12:", averageRating);


 // Question 13: Total revenue from delivered orders
const deliveredRevenue = orders
  .filter(({ status }) => status === "delivered")
  .reduce((total, { items }) => {
    const orderTotal = items.reduce(
      (sum, { price, qty }) => sum + price * qty,
      0
    );

    return total + orderTotal;
  }, 0);

console.log("Question 13:", deliveredRevenue);


 // Question 14: Calculate revenue for each order
const revenueByOrder = orders.map(({ id, items }) => {
  const total = items.reduce(
    (sum, { price, qty }) => sum + price * qty,
    0
  );

  return { id, total };
});

console.log("Question 14:", revenueByOrder);




 // Question 15: Group orders by district
const ordersByDistrict = orders.reduce(
  (groups, order) => {
    const { district } = order.customer;

    if (!groups[district]) {
      groups[district] = [];
    }

    groups[district].push(order);

    return groups;
  },
  {}
);

console.log("Question 15:", ordersByDistrict);



 // Question 16: Group orders by status
const ordersByStatus = orders.reduce(
  (groups, order) => {
    const { status } = order;

    if (!groups[status]) {
      groups[status] = [];
    }

    groups[status].push(order);

    return groups;
  },
  {}
);

console.log("Question 16:", ordersByStatus);

