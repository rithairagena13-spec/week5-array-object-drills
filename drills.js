
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

// Station 3 — Grouping &amp; ranking (20 min) — 3 points each


 // Question 15: Revenue per district from delivered orders
const revenueByDistrict = orders
  .filter(({ status }) => status === "delivered")
  .reduce((totals, order) => {
    const { district } = order.customer;

    const total = order.items.reduce(
      (sum, { price, qty }) => sum + price * qty,
      0
    );

    totals[district] = (totals[district] || 0) + total;

    return totals;
  }, {});

console.log("Question 15:", revenueByDistrict);

 
 // Question 16: Group orders by date
const groupedByDate = Object.groupBy(
  orders,
  ({ date }) => date
);

const dailySummary = Object.entries(groupedByDate).map(
  ([date, dailyOrders]) => ({
    date,
    count: dailyOrders.length,
    revenue: dailyOrders.reduce(
      (total, order) => total + order.items.reduce(
        (sum, { price, qty }) => sum + price * qty,
        0
      ),
      0
    )
  })
);

console.log("Question 16:", dailySummary);

 
 // Question 17: Top 3 best-selling items
const itemSales = orders
  .flatMap(({ items }) => items)
  .reduce((sales, { name, qty }) => {
    sales[name] = (sales[name] || 0) + qty;
    return sales;
  }, {});

const topThreeItems = Object.entries(itemSales)
  .map(([name, qty]) => ({ name, qty }))
  .toSorted((a, b) => b.qty - a.qty)
  .slice(0, 3);

console.log("Question 17:", topThreeItems);


 // Question 18: Each customer's order count and total spent
const customerSummary = Object.entries(
  orders.reduce((customers, order) => {
    const { name } = order.customer;

    if (!customers[name]) {
      customers[name] = { name, orders: 0, spent: 0 };
    }

    customers[name].orders += 1;

    customers[name].spent += order.items.reduce(
      (total, { price, qty }) => total + price * qty,
      0
    );

    return customers;
  }, {})
)
  .map(([name, summary]) => summary)
  .toSorted((a, b) => b.spent - a.spent);

console.log("Question 18:", customerSummary);



 // Question 19: Build a menu price list
const menuPrices = Object.fromEntries(
  [...new Map(
    orders.flatMap(({ items }) =>
      items.map(({ name, price }) => [name, price])
    )
  )]
);

console.log("Question 19:", menuPrices);


// Station 4 — Immutable updates


 // Question 20: Mark a pending order as delivered
const markDelivered = (orders, id) =>
  orders.map(order =>
    order.id === id && order.status === "pending"
      ? { ...order, status: "delivered" }
      : order
  );

const updatedOrder = markDelivered(orders, 105);

console.log(
  "Question 20:",
  updatedOrder.find(({ id }) => id === 105)
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);



 // Question 21: Rate a delivered order
const rateOrder = (orders, id, rating) =>
  orders.map(order =>
    order.id === id && order.status === "delivered"
      ? { ...order, rating }
      : order
  );

const ratedOrders = rateOrder(orders, 101, 4);

console.log(
  "Question 21:",
  ratedOrders.find(({ id }) => id === 101)
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);



 // Question 22: Change a customer's district
const changeDistrict = (orders, id, district) =>
  orders.map(order =>
    order.id === id
      ? { ...order,
          customer: { ...order.customer,
            district
          }
        }
      : order
  );

const districtUpdatedOrders = changeDistrict(orders, 101, "Kicukiro");

console.log(
  "Question 22:",
  districtUpdatedOrders.find(({ id }) => id === 101)
);

console.log(
  "Original unchanged:",
  JSON.stringify(orders) === ORIGINAL
);



 // Question 23: Add an item to an order
const addItem = (orders, id, item) =>
  orders.map(order =>
    order.id === id
      ? { ...order, items: [...order.items, item] }
      : order
  );

const itemUpdatedOrders = addItem(orders, 101, { name: "Samosa", price: 1000, qty: 2 });
console.log("Question 23:", itemUpdatedOrders.find(({ id }) => id === 101));
console.log("Original unchanged:", JSON.stringify(orders) === ORIGINAL);



 // Question 24: Remove cancelled orders
const removeCancelled = (orders) =>
  orders.filter(order => order.status !== "cancelled");

const activeOrders = removeCancelled(orders);
console.log("Question 24:", activeOrders);
console.log("Original unchanged:", JSON.stringify(orders) === ORIGINAL);



 // Question 25: Apply a discount to every item
const applyDiscount = (orders, percent) =>
  orders.map(order => ({
    ...order,
    items: order.items.map(item => ({
      ...item,
      price: Math.round(item.price * (1 - percent / 100))
    }))
  }));

const discountedOrders = applyDiscount(orders, 10);
console.log("Question 25:", discountedOrders);
console.log("Original unchanged:", JSON.stringify(orders) === ORIGINAL);
