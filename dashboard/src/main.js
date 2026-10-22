
import './style.css';
import { orders } from '../../data.js';

const orderTotal = order =>
  order.items.reduce((sum, item) => sum + item.price * item.qty, 0);

const deliveredOrders = orders.filter(order => order.status === 'delivered');
const totalRevenue = deliveredOrders.reduce((sum, order) => sum + orderTotal(order), 0);
const ratings = orders.map(order => order.rating).filter(rating => rating !== null);
const averageRating = ratings.length
  ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
  : 'N/A';

const itemSales = orders.flatMap(order => order.items).reduce((sales, item) => {
  sales[item.name] = (sales[item.name] || 0) + item.qty;
  return sales;
}, {});

const bestSellingItem = Object.entries(itemSales).sort((a, b) => b[1] - a[1])[0];
const money = value => `RWF ${value.toLocaleString()}`;

const stats = [
  { label: 'Total Revenue', value: money(totalRevenue), note: 'Delivered orders' },
  { label: 'Delivered Orders', value: deliveredOrders.length, note: 'Successfully delivered' },
  { label: 'Average Rating', value: `${averageRating} / 5`, note: 'Rated orders only' },
  { label: 'Best-Selling Item', value: bestSellingItem?.[0] ?? 'N/A', note: `${bestSellingItem?.[1] ?? 0} units sold` }
];

document.querySelector('#stats').innerHTML = stats.map(stat => `
  <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <p class="text-sm text-slate-500">${stat.label}</p>
    <p class="mt-3 text-2xl font-bold text-green-800">${stat.value}</p>
    <p class="mt-2 text-xs text-slate-500">${stat.note}</p>
  </article>
`).join('');

const districtRevenue = deliveredOrders.reduce((totals, order) => {
  const district = order.customer.district;
  totals[district] = (totals[district] || 0) + orderTotal(order);
  return totals;
}, {});

const maxRevenue = Math.max(...Object.values(districtRevenue), 1);

document.querySelector('#districtChart').innerHTML = Object.entries(districtRevenue).map(([district, value]) => `
  <div>
    <div class="mb-2 flex justify-between gap-3 text-sm">
      <span class="font-medium">${district}</span>
      <span class="text-slate-600">${money(value)}</span>
    </div>
    <div class="h-3 overflow-hidden rounded-full bg-green-100">
      <div class="h-full rounded-full bg-green-600" style="width: ${(value / maxRevenue) * 100}%"></div>
    </div>
  </div>
`).join('');

const statusClasses = {
  delivered: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-red-100 text-red-800'
};

let activeFilter = 'all';

function renderTable() {
  const filteredOrders = activeFilter === 'all'
    ? orders
    : orders.filter(order => order.status === activeFilter);

  document.querySelector('#tableCount').textContent =
    `Showing ${filteredOrders.length} of ${orders.length} orders`;

  // innerHTML is safe here because the rows use our trusted workshop dataset.
  document.querySelector('#ordersTable').innerHTML = filteredOrders.map(order => `
    <tr class="hover:bg-slate-50">
      <td class="p-3 font-medium">#${order.id}</td>
      <td class="p-3">${order.customer.name}</td>
      <td class="p-3">${order.customer.district}</td>
      <td class="p-3">${orderTotal(order).toLocaleString()}</td>
      <td class="p-3">
        <span class="rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status] ?? 'bg-slate-100 text-slate-800'}">${order.status}</span>
      </td>
    </tr>
  `).join('');
}

document.querySelector('#filters').addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;

  activeFilter = button.dataset.filter;

  document.querySelectorAll('#filters button').forEach(filterButton => {
    filterButton.className = filterButton === button
      ? 'rounded-lg bg-green-800 px-3 py-2 text-sm font-medium text-white'
      : 'rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium';
  });

  renderTable();
});

renderTable();
