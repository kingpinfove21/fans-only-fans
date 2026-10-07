export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "ox-standing-18",
    name: 'Ox 18" Standing Fan',
    price: 45000,
    image: "/ox-standing-18.png",
    description:
      "Powerful 18-inch standing fan with adjustable height and 3-speed control. Perfect for living rooms and offices.",
    category: "Standing",
  },
  {
    id: "binatone-ceiling-56",
    name: 'Binatone 56" Ceiling Fan',
    price: 38000,
    image: "/binatone-ceiling-56-v2.png",
    description:
      "Sleek 56-inch ceiling fan with quiet motor and remote control. Ideal for large rooms.",
    category: "Ceiling",
  },
  {
    id: "rechargeable-table",
    name: "Rechargeable Table Fan",
    price: 25000,
    image: "/rechargeable-table.png",
    description:
      "Rechargeable table fan with LED light and USB charging. Works during power outages.",
    category: "Rechargeable",
  },
  {
    id: "industrial-wall-24",
    name: 'Industrial Wall Fan 24"',
    price: 60000,
    image: "/industrial-wall-24.png",
    description:
      "Heavy-duty 24-inch wall-mounted fan for workshops, warehouses, and industrial spaces.",
    category: "Industrial",
  },
  {
    id: "ox-table-16",
    name: 'Ox 16" Table Fan',
    price: 22000,
    image: "/ox-table-16.png",
    description:
      "Compact 16-inch table fan with oscillating head and 3 speeds. Great for desks and bedside tables.",
    category: "Table",
  },
  {
    id: "century-standing-20",
    name: 'Century 20" Standing Fan',
    price: 52000,
    image: "/century-standing-20.png",
    description:
      "20-inch standing fan with copper motor, remote control, and timer. Long-lasting performance.",
    category: "Standing",
  },
  {
    id: "rechargeable-standing",
    name: "Rechargeable Standing Fan",
    price: 55000,
    image: "/rechargeable-standing.png",
    description:
      "Standing rechargeable fan with built-in battery, LED light, and solar charging option.",
    category: "Rechargeable",
  },
  {
    id: "mini-usb-desk",
    name: "Mini USB Desk Fan",
    price: 8000,
    image: "/mini-usb-desk.png",
    description:
      "Portable USB-powered desk fan. Quiet, compact, and perfect for laptops and small spaces.",
    category: "Table",
  },
  {
    id: "ceiling-remote",
    name: "Ceiling Fan with Remote",
    price: 65000,
    image: "/ceiling-remote.png",
    description:
      "Modern ceiling fan with remote control, dimmable LED light, and reversible blades.",
    category: "Ceiling",
  },
  {
    id: "industrial-floor-30",
    name: 'Industrial Floor Fan 30"',
    price: 85000,
    image: "/industrial-floor-30.png",
    description:
      "30-inch heavy-duty floor fan for maximum airflow in large industrial spaces.",
    category: "Industrial",
  },
];