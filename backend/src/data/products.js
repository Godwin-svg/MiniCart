const products = [
  {
    id: 1,
    sku: "MC-LAP-001",
    name: "MiniCart Laptop",
    description: "A reliable laptop for everyday work and study",
    price: 1299.99,
    availableQuantity: 15,
    imageReference: "products/minicart-laptop.jpg",
    active: true
  },
  {
    id: 2,
    sku: "MC-HDP-002",
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones",
    price: 249.95,
    availableQuantity: 30,
    imageReference: "products/wireless-headphones.jpg",
    active: true
  },
  {
    id: 3,
    sku: "MC-MON-003",
    name: "Office Monitor",
    description: "Twenty-seven-inch monitor for home and office use",
    price: 399.0,
    availableQuantity: 0,
    imageReference: "products/office-monitor.jpg",
    active: false
  }
];

module.exports = products;